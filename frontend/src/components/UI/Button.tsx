'use client';

import React from 'react';
import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

interface ButtonProps extends MuiButtonProps {
  isLoading?: boolean;
  hasGradient?: boolean;
}

export default function Button({
                                 children,
                                 isLoading = false,
                                 hasGradient = true,
                                 sx,
                                 disabled,
                                 ...props
                               }: ButtonProps) {
  return (
    <MuiButton
      variant="contained"
      fullWidth
      disabled={isLoading || disabled}
      sx={{
        py: '0.65rem',
        textTransform: 'none',
        fontSize: '0.875rem',
        mt: 3,
        background: hasGradient
          ? 'linear-gradient(45deg, #76FE03 30%, #18FFFF 90%)'
          : 'none',
        color: '#2E2E2E',
        fontWeight: 'bold',
        ...sx,
      }}
      endIcon={
        isLoading ? <CircularProgress size={20} color="inherit" /> : undefined
      }
      {...props}
    >
      {children}
    </MuiButton>
  );
}