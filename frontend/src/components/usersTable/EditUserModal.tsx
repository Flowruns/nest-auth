'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  CircularProgress,
  Typography,
  Divider,
  Button as MuiButton,
} from '@mui/material';
import Button from '@/components/UI/Button';
import { useUpdateUser } from '@/hooks/useUpdateUser';
import Input from '@/components/UI/Input';

interface User {
  userId: string;
  login: string;
  name: string;
  surName: string;
  role: string;
}

interface EditUserModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  user: User | null;
}

export default function EditUserModal({ open, onClose, onSuccess, user }: EditUserModalProps) {

  const [isSuccess, setIsSuccess] = useState(false);
  const {
    formData,
    isLoading,
    error,
    handleChange,
    handleSubmit,
    setInitialData,
    isPasswordLoading,
    passwordError,
    handleChangePassword,
  } = useUpdateUser({
    onSuccess: () => {
      onSuccess();
      setIsSuccess(true);
    },
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (user) {
      setInitialData({
        login: user.login,
        name: user.name,
        surName: user.surName,
      });
      setPasswordData({ currentPassword: '', newPassword: '' });
      setIsSuccess(false);
    }
  }, [user, setInitialData]);

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        setIsSuccess(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  const handleFormSubmit = () => {
    if (user) {
      handleSubmit(user.userId);
    }
  };

  const handleChangePasswordSubmit = async () => {
    if (!user) return;

    const ok = await handleChangePassword(
      user.userId,
      passwordData.currentPassword,
      passwordData.newPassword
    );

    if (ok) {
      setPasswordData({ currentPassword: '', newPassword: '' });
      // onSuccess();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Редактировать пользователя</DialogTitle>
      <DialogContent>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <Input
            margin="normal"
            required
            fullWidth
            id="login"
            label="Логин"
            name="login"
            autoComplete="login"
            autoFocus
            value={formData.login || ''}
            onChange={handleChange}
          />
          <Input
            margin="normal"
            fullWidth
            id="name"
            label="Имя"
            name="name"
            autoComplete="given-name"
            value={formData.name || ''}
            onChange={handleChange}
          />
          <Input
            margin="normal"
            fullWidth
            id="surName"
            label="Фамилия"
            name="surName"
            autoComplete="family-name"
            value={formData.surName || ''}
            onChange={handleChange}
          />
          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          {isSuccess && (
            <Typography color="success.main" sx={{ mt: 2 }}>
              Данные пользователя успешно редактированы
            </Typography>
          )}
          <Box sx={{ mt: 2, textAlign: 'right' }}>
            <Button onClick={handleFormSubmit} disabled={isLoading}>
              {isLoading ? <CircularProgress size={20} /> : 'Сохранить данные'}
            </Button>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }}>Смена пароля</Divider>

        <Box component="form" noValidate>
          <Input
            margin="normal"
            required
            fullWidth
            name="currentPassword"
            label="Текущий пароль"
            type="password"
            id="currentPassword"
            autoComplete="current-password"
            value={passwordData.currentPassword}
            onChange={handlePasswordChange}
          />
          <Input
            margin="normal"
            required
            fullWidth
            name="newPassword"
            label="Новый пароль"
            type="password"
            id="newPassword"
            autoComplete="new-password"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
          />
          {passwordError && (
            <Typography color="error" sx={{ mt: 1 }}>
              {passwordError}
            </Typography>
          )}
          <Box sx={{ mt: 2, textAlign: 'right' }}>
            <Button
              onClick={handleChangePasswordSubmit}
              disabled={
                isPasswordLoading ||
                !passwordData.currentPassword ||
                !passwordData.newPassword
              }
              color="warning"
            >
              {isPasswordLoading ? <CircularProgress size={20} /> : 'Сменить пароль'}
            </Button>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary" disabled={isLoading} hasGradient={false} sx={{width: '30%'}} >
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  );
}