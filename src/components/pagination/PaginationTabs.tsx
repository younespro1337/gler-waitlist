'use client';
import * as React from 'react';
import { Box, Button, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export interface PaginationTabsProps {
  page: number; // zero-based
  totalItems: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void; // zero-based
  maxButtons?: number; // how many numbered buttons to show at once
}

export default function PaginationTabs({
  page,
  totalItems,
  rowsPerPage,
  onPageChange,
  maxButtons = 5,
}: PaginationTabsProps) {
  const totalPages = Math.max(1, Math.ceil((totalItems || 0) / (rowsPerPage || 1)));
  const current = Math.min(Math.max(0, page), totalPages - 1);

  const visible = Math.max(1, Math.min(maxButtons, totalPages));
  const half = Math.floor(visible / 2);
  let start = current + 1 - half; // convert to 1-based for math
  if (start < 1) start = 1;
  if (start + visible - 1 > totalPages) start = Math.max(1, totalPages - visible + 1);
  const pages: number[] = Array.from({ length: visible }, (_, i) => start + i);

  const go = (p1Based: number) => {
    const next = Math.min(Math.max(1, p1Based), totalPages) - 1;
    if (next !== current) onPageChange(next);
  };

  return (
    <Box
      role="navigation"
      aria-label="pagination"
      sx={{
        mt: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: { xs: 'center', sm: 'flex-start' },
        gap: 0.75,
        flexWrap: 'wrap',
      }}
    >
      <IconButton
        size="small"
        aria-label="previous page"
        onClick={() => go(current)}
        disabled={current <= 0}
        sx={{ border: 1, borderColor: 'divider', borderRadius: 1, width: 30, height: 26, p: 0 }}
      >
        <ChevronLeftIcon fontSize="small" />
      </IconButton>

      {pages.map((p) => {
        const selected = p === current + 1;
        return (
          <Button
            key={p}
            size="small"
            variant="outlined"
            onClick={() => go(p)}
            aria-current={selected ? 'page' : undefined}
            sx={{
              minWidth: 30,
              height: 26,
              borderRadius: 1,
              borderColor: selected ? 'primary.main' : 'divider',
              color: selected ? 'primary.main' : 'text.primary',
              fontWeight: selected ? 600 : 500,
              bgcolor: 'background.paper',
            }}
          >
            {p}
          </Button>
        );
      })}

      <IconButton
        size="small"
        aria-label="next page"
        onClick={() => go(current + 2)}
        disabled={current >= totalPages - 1}
        sx={{ border: 1, borderColor: 'divider', borderRadius: 1, width: 30, height: 26, p: 0 }}
      >
        <ChevronRightIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}
