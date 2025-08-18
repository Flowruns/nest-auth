'use client';

import { useState, FormEvent, ChangeEvent, SyntheticEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { CreateUserRequestInterface, LoginInterface } from '@/types/auth.types';

type FormData = CreateUserRequestInterface;

export const useAuthForm = () => {
  const router = useRouter();
  const { login, register, error: authError, isLoading } = useAuth();
  const [tabIndex, setTabIndex] = useState(0);

  const [formData, setFormData] = useState<FormData>({
    login: '',
    password: '',
    name: '',
    surName: '',
  });

  const [error, setError] = useState<string | null>(null);

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
    setError(null);

    try {
      if (tabIndex === 0) {
        const dataToSend: LoginInterface = {
          login: formData.login,
          password: formData.password,
        };
        await login(dataToSend);
        router.push('/home');
      } else {
        const dataToSend: CreateUserRequestInterface = {
          login: formData.login,
          password: formData.password,
          name: formData.name,
          surName: formData.surName,
        };
        await register(dataToSend);
        alert('Регистрация прошла успешно! Теперь вы можете войти.');
        setTabIndex(0);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Произошла неизвестная ошибка');
      }
    }
  };

  return {
    tabIndex,
    formData,
    isLoading,
    error: error || authError,
    handleTabChange,
    handleInputChange,
    handleSubmit,
  };
};