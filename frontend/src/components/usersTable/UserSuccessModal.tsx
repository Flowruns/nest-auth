'use client';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  Alert,
} from '@mui/material';
import Button from '@/components/UI/Button';
import { CreateUserFormData } from '@/hooks/useCreateUser';

interface UserSuccessModalProps {
  open: boolean;
  onClose: () => void;
  userData: CreateUserFormData | null;
}

export default function UserSuccessModal({ open, onClose, userData }: UserSuccessModalProps) {
  if (!userData) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Пользователь успешно создан</DialogTitle>
      <DialogContent>
        <Alert severity="warning" sx={{ mb: 2 }}>
          Пожалуйста, сохраните эти данные. Они отображаются только один раз.
        </Alert>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1"><strong>Имя:</strong> {userData.name}</Typography>
          <Typography variant="body1"><strong>Фамилия:</strong> {userData.surName}</Typography>
          <Typography variant="body1"><strong>Логин:</strong> {userData.login}</Typography>
          <Typography variant="body1"><strong>Пароль:</strong> {userData.password}</Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: '0 24px 16px' }}>
        <Button onClick={onClose} sx={{ width: 'auto', ml: 'auto' }}>
          Понятно
        </Button>
      </DialogActions>
    </Dialog>
  );
}