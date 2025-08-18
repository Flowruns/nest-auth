// frontend/src/app/(protected)/layout.tsx
'use client';

import { useRouter } from 'next/navigation';
import { logout } from '@/lib/auth';
import Navbar from '@/components/layout/Navbar';
import { Box } from '@mui/material';
import { useAuth } from '@/context/AuthContext';

export default function ProtectedLayout({
                                          children,
                                        }: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!user) {
    return <>{children}</>;
  }

  return (
    <Box>
      <Navbar onLogout={handleLogout} />
      <main>{children}</main>
    </Box>
  );
}