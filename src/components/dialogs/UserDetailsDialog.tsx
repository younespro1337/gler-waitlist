'use client';
import * as React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Box,
  Typography,
  Chip,
  Divider,
  Stack,
  Paper,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import dayjs from 'dayjs';
import { ServiceProvider } from '@/lib/types';

export default function UserDetailsDialog({
  open,
  user,
  onClose,
}: {
  open: boolean;
  user?: ServiceProvider;
  onClose: () => void;
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      // Custom paper sizing to match Figma specs
      PaperProps={{
        sx: {
          width: '502.42px',
          maxWidth: '502.42px',
          height: '670.17px',
          border: '0px solid #E7E7E7',
          boxShadow:
            '1px 1px 3px 0px #0000001A, 5px 3px 6px 0px #00000017, 10px 8px 8px 0px #0000000D, 18px 13px 9px 0px #00000003, 29px 21px 10px 0px #00000000',
        },
      }}
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <PersonOutlineIcon />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>User Details</Typography>
          <Box sx={{ flex: 1 }} />
          <IconButton onClick={onClose} aria-label="close"><CloseIcon /></IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers sx={{ p: 2, overflowY: 'auto' }}>
        {user ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Header block */}
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
                {user.email.split('@')[0].replace(/\b\w/g, (c) => c.toUpperCase())}
              </Typography>
              <Typography variant="body2" color="text.secondary">{user.email}</Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                <Chip label="Customer" size="small" variant="outlined" />
                <Chip label={user.status || 'invited'} size="small" />
              </Stack>
            </Box>

            <Divider />

            {/* Contact Information */}
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Contact Information</Typography>
              <Stack spacing={1.2}>
                <Stack direction="row" alignItems="center" spacing={1.2}>
                  <EmailOutlinedIcon fontSize="small" />
                  <Typography variant="body2">{user.email}</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1.2}>
                  <PhoneOutlinedIcon fontSize="small" />
                  <Typography variant="body2">{user.phone}</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1.2}>
                  <PublicOutlinedIcon fontSize="small" />
                  <Typography variant="body2">United Kingdom</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1.2}>
                  <CalendarMonthOutlinedIcon fontSize="small" />
                  <Typography variant="body2">Signed up {dayjs(user.signupDate).format('D/M/YYYY')}</Typography>
                </Stack>
              </Stack>
            </Box>

            <Divider />

            {/* Customer Details */}
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Customer Details</Typography>
              <Stack direction="row" alignItems="center" spacing={1.2}>
                <PersonOutlineIcon fontSize="small" />
                <Typography variant="body2">{user.vendorType === 'Independent' ? 'individual' : 'company'}</Typography>
              </Stack>
            </Box>

            {/* User Details */}
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>User Details</Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                <Chip size="small" variant="outlined" label={user.serviceOffering} />
              </Stack>
            </Box>

            {/* Internal Notes */}
            <Box>
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Internal Notes</Typography>
                <IconButton size="small" aria-label="edit-notes" onClick={()=>console.log('Edit internal notes', user.id)}>
                  <EditOutlinedIcon fontSize="small" />
                </IconButton>
              </Stack>
              <Box>
                {/* Textarea styled per Figma specs */}
                <Box sx={{
                  width: { xs: '100%', sm: '449.23px' },
                }}>
                  <Typography component="div" sx={{ display: 'none' }} />
                </Box>
                <Box sx={{ width: { xs: '100%', sm: '449.23px' } }}>
                  {/* Using a bare textarea for exact styling control */}
                  <textarea
                    placeholder="No Note Added yet"
                    style={{
                      width: '100%',
                      height: '103.92px',
                      background: '#E9E9E9',
                      border: 'none',
                      borderRadius: '1px',
                      padding: '12px',
                      resize: 'vertical',
                      outline: 'none',
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '12px',
                      lineHeight: '16px',
                      color: 'inherit',
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        ) : (
          <Typography variant="body2">No user selected.</Typography>
        )}
      </DialogContent>
      <DialogActions sx={{ px: 2, pb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, width: '100%' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => console.log('Onboard clicked', user?.id)}
            sx={{
              px: 3,
              borderRadius: 999,
              textTransform: 'none',
              boxShadow: '0px 8px 16px rgba(47,128,237,0.24)',
            }}
          >
            Onboard
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => console.log('Reject clicked', user?.id)}
            sx={{
              px: 3,
              borderRadius: 999,
              textTransform: 'none',
              boxShadow: '0px 8px 16px rgba(211,47,47,0.24)',
            }}
          >
            Reject
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
