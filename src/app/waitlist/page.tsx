'use client';
import * as React from 'react';
import { Container, Box, LinearProgress } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { api } from '@/lib/axios';
import { ServiceProvider } from '@/lib/types';
import FiltersPanel, { defaultFilters, Filters } from '@/components/filters/FiltersPanel';
// Lazy load the table for faster first paint
const ServiceProvidersTable = React.lazy(() => import('@/components/table/ServiceProvidersTable'));
import UserDetailsDialog from '@/components/dialogs/UserDetailsDialog';
import WaitlistHeader from '@/components/waitlist/WaitlistHeader';
// Brand now rendered inside FiltersPanel to be part of the sidebar

function WaitlistPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  type IndexedRow = ServiceProvider & { signupEpoch: number; emailLower: string; phoneLower: string; postcodeLower: string };
  const [allRowsIdx, setAllRowsIdx] = React.useState<IndexedRow[]>([]);
  const [rows, setRows] = React.useState<ServiceProvider[]>([]);
  const [filters, setFilters] = React.useState<Filters>(defaultFilters());
  const [searchInput, setSearchInput] = React.useState('');
  const [search, setSearch] = React.useState(''); // debounced value
  const [loading, setLoading] = React.useState(true);
  const [entityType, setEntityType] = React.useState<'providers' | 'customers'>('providers');
  const [tableLoading, setTableLoading] = React.useState(false);
  const [isPending, startTransition] = React.useTransition();

  React.useEffect(() => {
    let active = true;
    setLoading(true);
    api.get('/api/service-providers')
      .then(res => {
        if (!active) return;
        const indexed: IndexedRow[] = (res.data.data as ServiceProvider[]).map(r => ({
          ...r,
          signupEpoch: Date.parse(r.signupDate),
          emailLower: r.email.toLowerCase(),
          phoneLower: r.phone.toLowerCase(),
          postcodeLower: r.postcode.toLowerCase(),
        }));
        setAllRowsIdx(indexed);
        setRows(res.data.data);
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  // Debounce search input (250ms)
  React.useEffect(() => {
    const t = setTimeout(() => setSearch(searchInput), 250);
    return () => clearTimeout(t);
  }, [searchInput]);

  // Filter with transition and single pass over indexed rows
  React.useEffect(() => {
    if (loading) return; // wait initial load
    setTableLoading(true);

    const q = search.trim().toLowerCase();
    const needQ = Boolean(q);
    const statuses:string[] = [];
    if (filters.status.onboarded) statuses.push('Onboarded');
    if (filters.status.rejected) statuses.push('Rejected');
    const vendors:string[] = [];
    if (filters.vendor.independent) vendors.push('Independent');
    if (filters.vendor.company) vendors.push('Company');
    const offerings:string[] = [];
    if (filters.offering.housekeeping) offerings.push('Housekeeping');
    if (filters.offering.windowCleaning) offerings.push('Window Cleaning');
    if (filters.offering.carValet) offerings.push('Car Valet');
    const hasStatus = statuses.length > 0;
    const hasVendors = vendors.length > 0;
    const hasOfferings = offerings.length > 0;
    const postcodeFilter = filters.postcode?.trim().toLowerCase();
    const hasPostcode = Boolean(postcodeFilter);
    const fromEpoch = filters.dateFrom ? Date.parse(filters.dateFrom) - 86400000 : undefined; // include day
    const toEpoch = filters.dateTo ? Date.parse(filters.dateTo) + 86400000 : undefined;

    startTransition(() => {
      const out: ServiceProvider[] = [];
      for (const r of allRowsIdx) {
        if (needQ) {
          if (!(r.emailLower.includes(q) || r.phoneLower.includes(q) || r.postcodeLower.includes(q))) continue;
        }
        if (hasPostcode && !r.postcodeLower.includes(postcodeFilter!)) continue;
        if (hasStatus && !statuses.includes(r.status)) continue;
        if (hasVendors && !vendors.includes(r.vendorType)) continue;
        if (hasOfferings && !offerings.includes(r.serviceOffering)) continue;
        if (fromEpoch !== undefined && !(r.signupEpoch > fromEpoch)) continue;
        if (toEpoch !== undefined && !(r.signupEpoch < toEpoch)) continue;
        out.push(r);
      }
      setRows(out);
      setTableLoading(false);
    });
  }, [allRowsIdx, filters, search, loading]);

  return (
    <Container maxWidth="xl" sx={{ pt: 2, pb: 1, height: '100%', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'minmax(260px,320px) 1fr' },
          gap: 2,
          width: '100%',
          height: 1,
          minHeight: 0,
          overflow: 'hidden',
        }}
      >
        <Box sx={{ minHeight: 0, height: 1, display: 'flex', flexDirection: 'column', gap: 2, overflow: 'hidden', bgcolor: '#F4F7F9' }}>
          <Box sx={{ minHeight: 0, overflowY: 'auto', pr: 0.5 }}>
            <FiltersPanel
              value={filters}
              onChange={setFilters}
              onReset={()=>setFilters(defaultFilters())}
            />
          </Box>
        </Box>
        <Box sx={{ minWidth: 0, overflow: 'hidden', height: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <WaitlistHeader
            title="Waitlist"
            entityType={entityType}
            onEntityTypeChange={(v)=>{ setEntityType(v); console.log('Entity switched to', v); }}
            searchValue={searchInput}
            onSearchChange={setSearchInput}
          />

          {loading && (
            <LinearProgress
              color="secondary"
              sx={{ mb: 1, height: 3, borderRadius: 0.5, position: 'sticky', top: 0, zIndex: 1 }}
            />
          )}
       
       
          {/* <Paper
            sx={{
              p: 2,
              mb: 2,
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr auto' },
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 400, color: '#12153A', fontFamily: 'Poppins, sans-serif' }}>Waitlist</Typography>
              <ToggleButtonGroup
                color="primary"
                size="small"
                exclusive
                value={entityType}
                onChange={(_, v) => { if (v) { setEntityType(v); console.log('Entity switched to', v); } }}
                aria-label="entity type selector"
                sx={{
                  '& .MuiToggleButton-root:not(:last-of-type)': { mr: 1 },
                }}
              >
                <ToggleButton value="providers" aria-label="service providers">Service Providers</ToggleButton>
                <ToggleButton value="customers" aria-label="customers">Customers</ToggleButton>
              </ToggleButtonGroup>
            </Box>








            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <TextField
                size="small"
                placeholder="Search User"
                value={searchInput}
                onChange={e=>setSearchInput(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchOutlinedIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                sx={{ width: { xs: '100%', md: '20%' }, minWidth: { md: 240 } }}
              />
            </Box>
          </Paper> */}



          <Box sx={{ flex: 1, minHeight: 0, overflow: 'auto' }}>
            <React.Suspense fallback={null}>
              <ServiceProvidersTable
                rows={entityType === 'providers' ? rows : []}
                loading={loading || tableLoading || isPending}
                onOpenDetails={(id)=>{
                  const params = new URLSearchParams(searchParams?.toString());
                  params.set('userId', id);
                  router.replace(`?${params.toString()}`, { scroll: false });
                }}
              />
            </React.Suspense>
          </Box>
        </Box>
      </Box>
      {/* User Details dialog controlled by URL param */}
      <UserDetailsDialog
        open={Boolean(searchParams?.get('userId'))}
        user={rows.find(r => r.id === searchParams?.get('userId'))}
        onClose={()=>{
          const params = new URLSearchParams(searchParams?.toString());
          params.delete('userId');
          router.replace(params.size ? `?${params.toString()}` : `?`, { scroll: false });
        }}
      />
    </Container>
  );
}

export default function WaitlistPage() {
  return (
    <React.Suspense fallback={null}>
      <WaitlistPageContent />
    </React.Suspense>
  );
}
