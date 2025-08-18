'use client';

import { SyntheticEvent, useState } from 'react';
import { Box, Tabs, Tab, CircularProgress, Typography } from '@mui/material';
import TabPanel from '@/components/UI/TabPanel';
import { useAuth } from '@/context/AuthContext';
import UsersTable from '@/components/usersTable/UsersTable';

export default function HomePage() {
  const [value, setValue] = useState(0);
  const { user, isLoading } = useAuth();

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  if (isLoading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  }

  if (!user) {
    return <Typography>Не удалось загрузить данные пользователя. Пожалуйста, войдите снова.</Typography>;
  }

  const isSuperAdmin = user.role === 'superAdmin';

  return (
    <Box sx={{ p: 3, pt: 2 }}> {/* Уменьшаем верхний отступ */}
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
  );
}