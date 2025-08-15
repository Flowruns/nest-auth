import { useState, useCallback } from 'react';
import { createUser } from '@/lib/api';

export interface CreateUserFormData {
  login: string;
  name: string;
  surName: string;
  password: string;
}

interface UseCreateUserProps {
  onSuccess?: (data: CreateUserFormData) => void;
}

export function useCreateUser({ onSuccess }: UseCreateUserProps = {}) {
  const [formData, setFormData] = useState<CreateUserFormData>({
    login: '',
    name: '',
    surName: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }, []);

  const handleSubmit = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      await createUser(formData);
      if (onSuccess) {
        onSuccess(formData);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Произошла неизвестная ошибка при создании пользователя');
      }
    } finally {
      setIsLoading(false);
    }
  }, [formData, onSuccess]);

  const resetForm = useCallback(() => {
    setFormData({
      login: '',
      name: '',
      surName: '',
      password: '',
    });
    setError(null);
  }, []);


  return {
    formData,
    isLoading,
    error,
    handleChange,
    handleSubmit,
    resetForm,
  };
}