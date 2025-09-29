'use client';
import * as React from 'react';
import type { HTMLAttributes } from 'react';
import { Box } from '@mui/material';
import { GridFooterContainer, GridPagination, useGridApiContext, useGridSelector, gridPaginationModelSelector, gridRowCountSelector } from '@mui/x-data-grid';
import PaginationTabs from '@/components/pagination/PaginationTabs';

export default function CustomGridFooter(rest: HTMLAttributes<HTMLDivElement>) {
  const apiRef = useGridApiContext();
  const paginationModel = useGridSelector(apiRef, gridPaginationModelSelector);
  const total = useGridSelector(apiRef, gridRowCountSelector) ?? 0;
  const page = paginationModel?.page ?? 0;
  const pageSize = paginationModel?.pageSize ?? 10;
  return (
    <GridFooterContainer
      {...rest}
      sx={{
        px: 0,
        py: 0,
        minHeight: 34,
        '& .MuiTablePagination-toolbar': {
          minHeight: 30,
          py: 0,
          px: 0,
          '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
            fontSize: '0.75rem',
            lineHeight: 1.2,
          },
          '& .MuiSelect-select': {
            paddingTop: 0.25,
            paddingBottom: 0.25,
          },
          '& .MuiTablePagination-spacer': { display: 'none' },
          '& .MuiTablePagination-actions': { display: 'none' },
        },
      }}
    >
      {/* Left side: Figma-like page tabs */}
      <Box sx={{ mr: 0.5 }}>
        <PaginationTabs
          page={page}
          totalItems={total}
          rowsPerPage={pageSize}
          onPageChange={(p) => apiRef.current.setPage(p)}
          showFirstLast
        />
      </Box>

      {/* Right side: keep MUI rows-per-page selector and displayed rows */}
      <Box sx={{ ml: 'auto' }}>
        <GridPagination />
      </Box>
    </GridFooterContainer>
  );
}
