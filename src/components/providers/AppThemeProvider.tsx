'use client';
import * as React from 'react';
import { ThemeProvider, CssBaseline, createTheme, GlobalStyles } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#2F80ED' },
    secondary: { main: '#6C5CE7' },
  },
  typography: {
    fontFamily: 'Poppins, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\"',
  },
  shape: { borderRadius: 8 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 8 },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: { borderRadius: 8 },
        notchedOutline: { borderRadius: 8 },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { borderRadius: 8 },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: { borderRadius: 8 },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          '&.Mui-selected': {
            backgroundColor: 'var(--toggle-selected-bg)',
            color: 'inherit',
            '&:hover': { backgroundColor: 'var(--toggle-selected-bg)' },
          },
        },
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        grouped: {
          borderRadius: 8,
        },
      },
    },
  },
});

export default function AppThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={(theme) => ({
        ':root': {
          '--sidebar-bg': '#F4F7F9',
          '--toggle-selected-bg': '#C8D5D9',
          '--table-alt-row-bg': '#EAEEF3',
          '--neutral-300': theme.palette.grey[500],
        },
      })} />
      {children}
    </ThemeProvider>
  );
}
