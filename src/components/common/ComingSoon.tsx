'use client';
import * as React from 'react';
import { Box, Typography } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function ComingSoon({
  title = 'Coming Soon',
  message = 'This section is not provided in the Figma yet. Placeholder only.',
}: { title?: string; message?: string }) {
  return (
    <Box sx={{
      height: '100%',
      minHeight: 240,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: 1,
      color: 'text.secondary',
    }}>
      <InfoOutlinedIcon color="primary" sx={{ fontSize: 36, mb: 0.5 }} />
      <Typography variant="h6" sx={{ fontWeight: 500 }}>{title}</Typography>
      <Typography variant="body2" sx={{ textAlign: 'center', maxWidth: 520 }}>{message}</Typography>
    </Box>
  );
}

