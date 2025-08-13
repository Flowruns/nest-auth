'use client';

import { useState, FormEvent, ChangeEvent, SyntheticEvent } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser, loginUser } from '@/services/authService';
import { AxiosError } from 'axios';
import { CreateUserRequestInterface, LoginInterface } from '@/types/auth.types';

type FormData = CreateUserRequestInterface;

export const useAuthForm = () => {
  const router = useRouter();
  const [tabIndex, setTabIndex] = useState(0);

  const [formData, setFormData] = useState<FormData>({
    login: '',
    password: '',
    name: '',
    surName: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
    setFormData({ login: '', password: '', name: '', surName: '' });
    setError(null);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (tabIndex === 0) {
        const dataToSend: LoginInterface = {
          login: formData.login,
          password: formData.password,
        };
        await loginUser(dataToSend);
        alert('Вход выполнен успешно!');
        router.push('/dashboard');
      } else {
        const dataToSend: CreateUserRequestInterface = {
          login: formData.login,
          password: formData.password,
        };
        if (formData.name) dataToSend.name = formData.name;
        if (formData.surName) dataToSend.surName = formData.surName;

        await registerUser(dataToSend);
        alert('Регистрация прошла успешно! Теперь вы можете войти.');
        setTabIndex(0);
      }
    } catch (err) {
      let errorMessage = 'Произошла непредвиденная ошибка';
      if (err instanceof AxiosError) {
        errorMessage = err.response?.data?.message || 'Ошибка при запросе к серверу';
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    tabIndex,
    formData,
    isLoading,
    error,
    handleTabChange,
    handleInputChange,
    handleSubmit,
  };
};