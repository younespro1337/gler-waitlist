'use client';
import * as React from 'react';
import { Box, Paper, Stack, TextField, FormGroup, FormControlLabel, Checkbox, Button, Divider, Typography, InputAdornment } from '@mui/material';
import type { Theme } from '@mui/system';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { Brand } from '@/components/layout/AppHeader';

export type Filters = {
  postcode: string;
  status: { onboarded: boolean; rejected: boolean };
  vendor: { independent: boolean; company: boolean };
  offering: { housekeeping: boolean; windowCleaning: boolean; carValet: boolean };
  dateFrom: string | null;
  dateTo: string | null;
  search: string;
};

export function defaultFilters(): Filters {
  return {
    postcode: '',
    status: { onboarded: false, rejected: false },
    vendor: { independent: false, company: false },
    offering: { housekeeping: false, windowCleaning: false, carValet: false },
    dateFrom: null,
    dateTo: null,
    search: '',
  };
}

export default function FiltersPanel({ value, onChange, onReset }:{
  value: Filters; onChange: (f: Filters)=>void; onReset: ()=>void;
}) {
  return (
    <Paper sx={{ p:2, position:'sticky', top:16, bgcolor: 'var(--sidebar-bg)' }} elevation={0}>
      <Box sx={{ mb: 2 }}>
        <Brand />
      </Box>
      <Box
        sx={{
          mb: 2,
          width: 256,
          height: 36,
          px: 2,
          py: 1,
          borderRadius: 2,
          bgcolor: '#D3D8DD',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 1.25,
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 700,
            fontSize: 16,
            lineHeight: '20px',
            color: '#000000',
            whiteSpace: 'nowrap',
          }}
        >
          User Management
        </Typography>
      </Box>

      <TextField label="Postcode" size="small" fullWidth
        value={value.postcode} onChange={e=>onChange({ ...value, postcode: e.target.value })} sx={{ mb:2 }} />

      <Typography variant="caption">Registration Status</Typography>
      <FormGroup>
        <FormControlLabel control={
          <Checkbox checked={value.status.onboarded}
            onChange={(_,c)=>onChange({ ...value, status:{...value.status, onboarded:c} })} />
        } label="Onboarded" />
        <FormControlLabel control={
          <Checkbox checked={value.status.rejected}
            onChange={(_,c)=>onChange({ ...value, status:{...value.status, rejected:c} })} />
        } label="Rejected" />
      </FormGroup>

      <Divider sx={{ my:1 }} />
      <Typography variant="caption">Date Registered</Typography>
      <Stack direction="row" spacing={1} sx={{ my:1 }}>
        <TextField
          label="Start"
          size="small"
          fullWidth
          value={value.dateFrom ?? ''}
          onChange={e=>onChange({ ...value, dateFrom:e.target.value||null })}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <CalendarMonthOutlinedIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
          placeholder="Start"
        />
        <TextField
          label="End"
          size="small"
          fullWidth
          value={value.dateTo ?? ''}
          onChange={e=>onChange({ ...value, dateTo:e.target.value||null })}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <CalendarMonthOutlinedIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
          placeholder="End"
        />
      </Stack>

      <Divider sx={{ my:1 }} />
      <Typography variant="caption">Vendor Type</Typography>
      <FormGroup>
        <FormControlLabel control={
          <Checkbox checked={value.vendor.independent}
            onChange={(_,c)=>onChange({ ...value, vendor:{...value.vendor, independent:c} })} />
        } label="Independent" />
        <FormControlLabel control={
          <Checkbox checked={value.vendor.company}
            onChange={(_,c)=>onChange({ ...value, vendor:{...value.vendor, company:c} })} />
        } label="Company" />
      </FormGroup>

      <Divider sx={{ my:1 }} />
      <Typography variant="caption">Service Offering</Typography>
      <FormGroup>
        <FormControlLabel control={
          <Checkbox checked={value.offering.housekeeping}
            onChange={(_,c)=>onChange({ ...value, offering:{...value.offering, housekeeping:c} })} />
        } label="Housekeeping" />
        <FormControlLabel control={
          <Checkbox checked={value.offering.windowCleaning}
            onChange={(_,c)=>onChange({ ...value, offering:{...value.offering, windowCleaning:c} })} />
        } label="Window Cleaning" />
        <FormControlLabel control={
          <Checkbox checked={value.offering.carValet}
            onChange={(_,c)=>onChange({ ...value, offering:{...value.offering, carValet:c} })} />
        } label="Car Valet" />
      </FormGroup>

      <Button
        variant="contained"
        sx={{ mt:2, px: 3, borderRadius: 999, display: 'block', mx: 'auto' }}
        onClick={onReset}
      >
        Filter
      </Button>
    </Paper>
  );
}

