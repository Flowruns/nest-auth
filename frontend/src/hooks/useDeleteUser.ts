import { useState, useCallback } from 'react';
import { deleteUser } from '@/lib/api';

interface UseDeleteUserProps {
  onSuccess?: () => void;
}

export function useDeleteUser({ onSuccess }: UseDeleteUserProps = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = useCallback(async (userId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await deleteUser(userId);
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Произошла неизвестная ошибка при удалении пользователя');
      }
    } finally {
      setIsLoading(false);
    }
  }, [onSuccess]);

  return {
    isLoading,
    error,
    handleDelete,
  };
}