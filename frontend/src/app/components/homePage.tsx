'use client';

import { SyntheticEvent, useState } from 'react';
import { Box, Tabs, Tab, CircularProgress, Typography } from '@mui/material';
import TabPanel from '@/components/UI/TabPanel';
import { useAuth } from '@/context/AuthContext';
import UsersTable from '@/components/usersTable/UsersTable';
import { logout } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import Button from '@/components/UI/Button';

export default function HomePage() {
  const [value, setValue] = useState(0);
  const { user, isLoading } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  if (isLoading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  }

  if (!user) return <Typography>Не удалось загрузить данные пользователя. Пожалуйста, войдите снова.</Typography>;

  const isSuperAdmin = user.role === 'superAdmin';

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          p: 3,
          width: '100%',
          alignItems: 'flex-start',
        }}
      >
        <Box
          component="img"
          src="/Logo.svg"
          alt="Логотип FreeFrog"
          sx={{
            width: 80,
            height: 'auto',
          }}
        />
        <Button
          onClick={handleLogout}
          sx={{ textTransform: 'none', width: 'auto', mt: 0 }}
        >
          Выйти
        </Button>
      </Box>

      <Box sx={{ p: 3, pt: 0 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="home tabs"
            sx={{
              '& .MuiTab-root': {
                fontWeight: 'bold',
                fontSize: '1.3rem',
                textTransform: 'none',
                color: '#2E2E2E',
            },
          }}>
            {isSuperAdmin && <Tab label="Пользователи" />}
            <Tab label="Компании" id={`auth-tab-${isSuperAdmin ? 1 : 0}`}
                 aria-controls={`auth-tabpanel-${isSuperAdmin ? 1 : 0}`} />
          </Tabs>
        </Box>

        {isSuperAdmin && (
          <TabPanel value={value} index={0}>
            <UsersTable />
          </TabPanel>
        )}

        <TabPanel value={value} index={isSuperAdmin ? 1 : 0}>
          <Typography>Контент для вкладки Компании будет здесь.</Typography>
        </TabPanel>
      </Box>
    </Box>
  );
}