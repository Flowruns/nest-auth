'use client';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Box,
  Alert,
} from '@mui/material';
import { useCreateUser, CreateUserFormData } from '@/hooks/useCreateUser';
import Button from '@/components/UI/Button';

interface AddUserModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (data: CreateUserFormData) => void;
}

export default function AddUserModal({ open, onClose, onSuccess }: AddUserModalProps) {
  const { formData, isLoading, error, handleChange, handleSubmit, resetForm } = useCreateUser({
    onSuccess: (data) => {
      onSuccess(data);
      resetForm();
    },
  });

  const handleClose = () => {
    onClose();
    resetForm();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Добавить нового пользователя</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>
          Заполните все поля для создания нового аккаунта
        </DialogContentText>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Box component="form" noValidate autoComplete="off">
          <TextField
            autoFocus
            margin="dense"
            name="login"
            label="Логин"
            fullWidth
            variant="outlined"
            onChange={handleChange}
            value={formData.login}
            disabled={isLoading}
          />
          <TextField
            margin="dense"
            name="name"
            label="Имя"
            fullWidth
            variant="outlined"
            onChange={handleChange}
            value={formData.name}
            disabled={isLoading}
          />
          <TextField
            margin="dense"
            name="surName"
            label="Фамилия"
            fullWidth
            variant="outlined"
            onChange={handleChange}
            value={formData.surName}
            disabled={isLoading}
          />
          <TextField
            margin="dense"
            name="password"
            label="Пароль"
            type="password"
            fullWidth
            variant="outlined"
            onChange={handleChange}
            value={formData.password}
            disabled={isLoading}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: '0 24px 16px' }}>
        <Button onClick={handleClose} color="secondary" disabled={isLoading} hasGradient={false}  sx={{width: '30%'}}>
          Отмена
        </Button>
        <Button onClick={handleSubmit} isLoading={isLoading} sx={{ width: '30%' }}>
          Создать
        </Button>
      </DialogActions>
    </Dialog>
  );
}