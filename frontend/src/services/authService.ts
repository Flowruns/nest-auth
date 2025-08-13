import axios, { AxiosError } from 'axios';
import { AuthResponseInterface, CreateUserRequestInterface, LoginInterface } from '@/types/auth.types';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const registerUser = async (userData: CreateUserRequestInterface): Promise<AuthResponseInterface> => {
  try {
    const { data } = await api.post<AuthResponseInterface>('/auth/register', userData);
    return data;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(err.response?.data?.message || 'Ошибка регистрации');
    }
    throw new Error('Произошла непредвиденная ошибка');
  }
};

export const loginUser = async (loginData: LoginInterface): Promise<AuthResponseInterface> => {
  try {
    const { data } = await api.post<AuthResponseInterface>('/auth/login', loginData);
    return data;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(err.response?.data?.message || 'Неверный логин или пароль');
    }
    throw new Error('Произошла непредвиденная ошибка');
  }
};