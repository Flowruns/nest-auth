import { useState, useCallback } from 'react';
import { updateUser, changePassword } from '@/lib/api';
import axios from 'axios';

export interface UpdateUserFormData {
  login?: string;
  name?: string;
  surName?: string;
}

interface UseUpdateUserProps {
  onSuccess?: () => void;
}

export function useUpdateUser({ onSuccess }: UseUpdateUserProps = {}) {
  const [formData, setFormData] = useState<UpdateUserFormData>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }, []);

  const handleSubmit = useCallback(async (userId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const dataToUpdate = Object.entries(formData).reduce((acc, [key, value]) => {
        if (value) {
          acc[key as keyof UpdateUserFormData] = value;
        }
        return acc;
      }, {} as UpdateUserFormData);

      if (Object.keys(dataToUpdate).length === 0) {
        setIsLoading(false);
        return;
      }

      await updateUser(userId, dataToUpdate);
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Произошла неизвестная ошибка при обновлении пользователя');
      }
    } finally {
      setIsLoading(false);
    }
  }, [formData, onSuccess]);

  const setInitialData = useCallback((data: UpdateUserFormData) => {
    setFormData(data);
    setError(null);
  }, []);

  const handleChangePassword = useCallback(
    async (
      userId: string,
      currentPassword: string,
      newPassword: string
    ): Promise<boolean> => {
      setIsPasswordLoading(true);
      setPasswordError(null);

      try {
        await changePassword(userId, { currentPassword, newPassword });
        alert('Пароль успешно изменен!');
        return true;
      } catch (err) {
        setPasswordError('Неверный текущий пароль');
        return false;
      } finally {
        setIsPasswordLoading(false);
      }
    },
    []
  );

  return {
    formData,
    isLoading,
    error,
    handleChange,
    handleSubmit,
    setInitialData,
    isPasswordLoading,
    passwordError,
    handleChangePassword,
  };
}