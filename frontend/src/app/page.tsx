import Box from '@mui/material/Box';
import AuthForm from '@/components/AuthForm';

export default function RegisterPage() {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        bgcolor: 'grey.100',
      }}
    >
      <Box
        component="img"
        src="/Logo.svg"
        alt="Логотип FreeFrog"
        sx={{
          position: 'absolute',
          top: 24,
          left: 24,
          width: 100,
          height: 'auto',
        }}
      />
      <AuthForm />
    </Box>
  );
}