'use client';
import * as React from 'react';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Chip, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import dayjs from 'dayjs';
import { ServiceProvider } from '@/lib/types';
import CustomGridFooter from '@/components/table/CustomGridFooter';

const statusColor = (s: ServiceProvider['status']) =>
  s === 'Onboarded' ? 'success' : s === 'Rejected' ? 'error' : 'default';

export default function ServiceProvidersTable({ rows, onOpenDetails, loading }:{ rows: ServiceProvider[]; onOpenDetails?: (id: string)=>void; loading?: boolean }) {
  const [data, setData] = React.useState<ServiceProvider[]>(rows);
  const [paginationModel, setPaginationModel] = React.useState<{ page: number; pageSize: number }>({ page: 0, pageSize: 25 });

  React.useEffect(() => { setData(rows); }, [rows]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[+\d][\d\s().-]{6,}$/;

  const processRowUpdate = (newRow: ServiceProvider, oldRow: ServiceProvider): ServiceProvider => {
    const updated: ServiceProvider = { ...oldRow, ...newRow };

    if (!emailRegex.test(updated.email)) {
      console.error('Invalid email format:', updated.email);
      throw new Error('Invalid email');
    }
    if (!phoneRegex.test(updated.phone)) {
      console.error('Invalid phone number:', updated.phone);
      throw new Error('Invalid phone');
    }
    if (!updated.postcode) {
      console.error('Postcode required');
      throw new Error('Postcode required');
    }

    // Constrain enum-like fields
    const vendorOptions = ['Independent', 'Company'] as const;
    const offeringOptions = ['Housekeeping', 'Window Cleaning', 'Car Valet'] as const;
    const statusOptions = ['Onboarded', 'Rejected', 'Pending'] as const;
    if (!vendorOptions.includes(updated.vendorType)) throw new Error('Invalid vendor type');
    if (!offeringOptions.includes(updated.serviceOffering)) throw new Error('Invalid offering');
    if (!statusOptions.includes(updated.status)) throw new Error('Invalid status');

    setData(prev => prev.map(r => (r.id === updated.id ? updated : r)));
    console.log('Row updated', { oldRow, newRow: updated });
    return updated;
  };

  const columns: GridColDef<ServiceProvider>[] = [
    // Editable: email (with validation)
    { field: 'email', headerName: 'Email', flex: 1, minWidth: 220, editable: true },
    // Editable: phone
    { field: 'phone', headerName: 'Phone Number', flex: 0.6, minWidth: 140, editable: true },
    // Editable: postcode
    { field: 'postcode', headerName: 'Postcode', flex: 0.5, minWidth: 100, editable: true },
    // Editable: vendor type (single select)
    { field: 'vendorType', headerName: 'Vendor Type', flex: 0.6, minWidth: 130, editable: true, type: 'singleSelect', valueOptions: ['Independent', 'Company'] },
    // Editable: service offering (single select)
    { field: 'serviceOffering', headerName: 'Service Offering', flex: 0.8, minWidth: 160, editable: true, type: 'singleSelect', valueOptions: ['Housekeeping', 'Window Cleaning', 'Car Valet'] },
    // Read-only: signup date
    { field: 'signupDate', headerName: 'Signup Date', flex: 0.5, minWidth: 120,
      renderCell: ({ row }) => (row.signupDate ? dayjs(row.signupDate).format('DD/MM/YYYY') : '') },
    // Editable: status (single select) but rendered as chip when not editing
    { field: 'status', headerName: 'Status', flex: 0.5, minWidth: 120, editable: true, type: 'singleSelect', valueOptions: ['Onboarded', 'Rejected', 'Pending'],
      renderCell: ({ row }) => <Chip size="small" label={row.status} color={statusColor(row.status)} /> },
    // Actions column (non-editable)
    { field: 'actions', headerName: 'Actions', width: 90, sortable: false,
      renderCell: (p) => (
        <IconButton size="small" aria-label="edit" onClick={()=> onOpenDetails?.(p.row.id)}>
          <EditIcon fontSize="small" />
        </IconButton>
      ) },
  ];

  // Clamp page when data or pageSize changes to avoid empty pages
  React.useEffect(() => {
    const totalPages = Math.max(1, Math.ceil((data.length || 0) / (paginationModel.pageSize || 1)));
    if (paginationModel.page > totalPages - 1) {
      setPaginationModel((pm) => ({ ...pm, page: totalPages - 1 }));
    }
  }, [data.length, paginationModel.pageSize, paginationModel.page]);

  const autoHeight = paginationModel.pageSize === 10;

  return (
    <React.Fragment>
      <DataGrid<ServiceProvider>
        rows={data}
        columns={columns}
        getRowId={(r)=>r.id}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[25,10,50]}
        disableRowSelectionOnClick
        checkboxSelection
        editMode="row"
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={(err: unknown)=>console.error('Row update error', err)}
        density="compact"
        slots={{ toolbar: GridToolbar, footer: CustomGridFooter }}
        loading={Boolean(loading)}
        autoHeight={autoHeight}
        sx={{
          width: '100%',
          maxWidth: '100%',
          // Only enforce full height when not autoHeight
          height: autoHeight ? 'auto' : '100%',
          '& .MuiDataGrid-columnHeaders': {
            zIndex: 2,
          },
          '& .MuiDataGrid-row:nth-of-type(even)': {
            backgroundColor: 'var(--table-alt-row-bg)',
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: 'action.hover',
          },
          '& .MuiDataGrid-row.Mui-selected': {
            backgroundColor: 'action.selected',
            '&:hover': { backgroundColor: 'action.selected' },
          },
          // Keep default wrapping behavior for responsiveness
        }}
      />
    </React.Fragment>
  );
}
