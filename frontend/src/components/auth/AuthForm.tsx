'use client';

import { useAuthForm } from '@/hooks/useAuthForm';
import { Box, Tabs, Tab, Alert } from '@mui/material';
import Button from '@/components/UI/Button';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';

export default function AuthForm() {
  const {
    tabIndex,
    formData,
    isLoading,
    error,
    handleTabChange,
    handleInputChange,
    handleSubmit
  } = useAuthForm();

  return (
    <Box
      sx={{
        maxWidth: '440px',
        bgcolor: 'background.paper',
        borderRadius: 2,
        p: 3,
        boxShadow: 3,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box>
        <Tabs value={tabIndex} onChange={handleTabChange} centered>
          <Tab label="Войти" sx={{fontWeight: 'bold', color: '#2E2E2E'}} />
          <Tab label="Зарегистрироваться" sx={{fontWeight: 'bold', color: '#2E2E2E'}}/>
        </Tabs>
      </Box>

      <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', pt: 3 }}>
        <Box sx={{ position: 'relative' }}>

          <Box sx={{ visibility: 'hidden' }}>
            <RegistrationForm formData={formData} handleInputChange={handleInputChange} />
          </Box>

          <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%' }}>
            {tabIndex === 0 ? (
              <LoginForm formData={formData} handleInputChange={handleInputChange} />
            ) : (
              <RegistrationForm formData={formData} handleInputChange={handleInputChange} />
            )}
          </Box>

        </Box>

        {error && (
          <Alert
            severity="error"
            sx={{
              bgcolor: 'rgba(255, 0, 0, 0.1)',
              mt: 2
            }}
          >
            {error}
          </Alert>
        )}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          loading={isLoading}
        >
          {tabIndex === 0 ? 'Войти' : 'Зарегистрироваться'}
        </Button>
      </Box>
    </Box>
  );
}