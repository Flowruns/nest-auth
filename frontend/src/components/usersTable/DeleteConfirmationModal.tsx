'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  CircularProgress
} from '@mui/material';
import Button from '@/components/UI/Button';

interface DeleteConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
  userName?: string;
}

export default function DeleteConfirmationModal({
                                                  open,
                                                  onClose,
                                                  onConfirm,
                                                  isLoading,
                                                  userName
                                                }: DeleteConfirmationModalProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Подтверждение удаления</DialogTitle>
      <DialogContent>
        <Typography>
          Вы уверены, что хотите удалить пользователя "{userName}"?
          Это действие нельзя будет отменить.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" disabled={isLoading} hasGradient={false}>
          Отмена
        </Button>
        <Button onClick={onConfirm} color="error" disabled={isLoading}>
          {isLoading ? <CircularProgress size={24} /> : 'Удалить'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}