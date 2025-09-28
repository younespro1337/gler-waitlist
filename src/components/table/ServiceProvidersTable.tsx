'use client';
import * as React from 'react';
import { DataGrid, GridColDef, GridToolbar, GridRowModel } from '@mui/x-data-grid';
import { Chip, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import dayjs from 'dayjs';
import { ServiceProvider } from '@/lib/types';

const statusColor = (s: ServiceProvider['status']) =>
  s === 'Onboarded' ? 'success' : s === 'Rejected' ? 'error' : 'default';

export default function ServiceProvidersTable({ rows, onOpenDetails, loading }:{ rows: ServiceProvider[]; onOpenDetails?: (id: string)=>void; loading?: boolean }) {
  const [data, setData] = React.useState<ServiceProvider[]>(rows);

  React.useEffect(() => { setData(rows); }, [rows]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[+\d][\d\s().-]{6,}$/;

  const processRowUpdate = (newRow: GridRowModel, oldRow: GridRowModel) => {
    const updated = { ...oldRow, ...newRow } as ServiceProvider;

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
    if (!vendorOptions.includes(updated.vendorType as any)) throw new Error('Invalid vendor type');
    if (!offeringOptions.includes(updated.serviceOffering as any)) throw new Error('Invalid offering');
    if (!statusOptions.includes(updated.status as any)) throw new Error('Invalid status');

    setData(prev => prev.map(r => (r.id === updated.id ? updated : r)));
    console.log('Row updated', { oldRow, newRow: updated });
    return updated;
  };

  const columns: GridColDef[] = [
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
      renderCell: (p) => {
        const v = (p as any)?.row?.signupDate as string | undefined;
        return v ? dayjs(v).format('DD/MM/YYYY') : '';
      } },
    // Editable: status (single select) but rendered as chip when not editing
    { field: 'status', headerName: 'Status', flex: 0.5, minWidth: 120, editable: true, type: 'singleSelect', valueOptions: ['Onboarded', 'Rejected', 'Pending'],
      renderCell: p => <Chip size="small" label={p.value} color={statusColor(p.value)} /> },
    // Actions column (non-editable)
    { field: 'actions', headerName: 'Actions', width: 90, sortable: false,
      renderCell: (p) => (
        <IconButton size="small" aria-label="edit" onClick={()=> onOpenDetails?.(p.row.id)}>
          <EditIcon fontSize="small" />
        </IconButton>
      ) },
  ];

  return (
    <DataGrid
      rows={data}
      columns={columns}
      getRowId={(r)=>r.id}
      pageSizeOptions={[10,25,50]}
      initialState={{ pagination:{ paginationModel:{ pageSize:10, page:0 } } }}
      disableRowSelectionOnClick
      checkboxSelection
      editMode="row"
      processRowUpdate={processRowUpdate}
      onProcessRowUpdateError={(err)=>console.error('Row update error', err)}
      density="compact"
      slots={{ toolbar: GridToolbar }}
      loading={Boolean(loading)}
      sx={{
        width: '100%',
        maxWidth: '100%',
        height: '100%',
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
      }}
    />
  );
}
