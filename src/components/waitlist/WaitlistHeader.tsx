'use client';
import * as React from 'react';
import {
  Box,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  TextField,
  InputAdornment,
} from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

type EntityType = 'providers' | 'customers';

export default function WaitlistHeader({
  title = 'Waitlist',
  entityType,
  onEntityTypeChange,
  searchValue,
  onSearchChange,
}: {
  title?: string;
  entityType: EntityType;
  onEntityTypeChange: (v: EntityType) => void;
  searchValue: string;
  onSearchChange: (v: string) => void;
}) {
  return (
    <Box
      sx={{
        mb: 1,
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr auto' },
        alignItems: 'center',
        gap: 2,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 400, color: '#12153A', fontFamily: 'Poppins, sans-serif' }}>
          {title}
        </Typography>
        <ToggleButtonGroup
          color="primary"
          size="small"
          exclusive
          value={entityType}
          onChange={(_, v) => { if (v) onEntityTypeChange(v); }}
          aria-label="entity type selector"
          sx={{ '& .MuiToggleButton-root:not(:last-of-type)': { mr: 1 } }}
        >
          <ToggleButton value="providers" aria-label="service providers">Service Providers</ToggleButton>
          <ToggleButton value="customers" aria-label="customers">Customers</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <TextField
          size="small"
          placeholder="Search User"
          value={searchValue}
          onChange={e => onSearchChange(e.target.value)}
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
    </Box>
  );
}
