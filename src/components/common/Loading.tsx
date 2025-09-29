'use client';
import * as React from 'react';
import { Backdrop, Box, CircularProgress, Typography } from '@mui/material';
import type { Theme } from '@mui/system';

export default function Loading({
  message = 'Loading... please wait',
  size = 28,
  fullScreen = false,
}: {
  message?: string;
  size?: number;
  fullScreen?: boolean;
}) {
  if (fullScreen) {
    return (
      <Backdrop open sx={{ zIndex: 1600 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <CircularProgress size={size} />
          <Typography variant="body2">{message}</Typography>
        </Box>
      </Backdrop>
    );
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 3, justifyContent: 'center' }}>
      <CircularProgress size={size} />
      <Typography variant="body2">{message}</Typography>
    </Box>
  );
}
