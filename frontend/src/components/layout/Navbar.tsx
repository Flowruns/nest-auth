'use client';

import { Box, Paper } from '@mui/material';
import Image from 'next/image';
import Button from '@/components/UI/Button';

interface NavbarProps {
  onLogout: () => void;
}

export default function Navbar({ onLogout }: NavbarProps) {
  return (
    <Box
      component={Paper}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        p: 1,
        width: '100%',
        alignItems: 'center',
        borderBottom: 1,
        borderColor: '#BCCBCE',
        backgroundColor: '#e0f7fa'
      }}
    >
      <Image
        src="/Logo.svg"
        alt="Логотип FreeFrog"
        width={50}
        height={50}
        style={{ height: 'auto' }}
      />
      <Button
        onClick={onLogout}
        sx={{ textTransform: 'none', width: 'auto', mt: 0 }}
      >
        Выйти
      </Button>
    </Box>
  );
}