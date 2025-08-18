'use client';

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import axios, { AxiosError, AxiosInstance } from 'axios';
import { CreateUserRequestInterface, LoginInterface, AuthResponseInterface, UserInterface } from '@/types/auth.types';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

interface AuthContextType {
  user: UserInterface | null;
  login: (loginData: LoginInterface) => Promise<void>;
  register: (userData: CreateUserRequestInterface) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
  axiosInstance: AxiosInstance;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserInterface | null>(null);
  // Состояние для токена больше не нужно, т.к. он управляется внутри axios и localStorage
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const validateToken = async () => {
      const storedToken = localStorage.getItem('accessToken');
      if (storedToken) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        try {
          const { data } = await axiosInstance.get<UserInterface>('/auth/profile');
          setUser(data);
        } catch (err) {
          logout();
        }
      }
      setIsLoading(false);
    };

    validateToken();
  }, []);

  const handleAuthSuccess = async (accessToken: string) => {
    localStorage.setItem('accessToken', accessToken);
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

    try {
      const { data } = await axiosInstance.get<UserInterface>('/auth/profile');
      setUser(data);
      setError(null);
    } catch(err) {
      handleError(err);
      logout();
    }
  };

  const handleError = (err: unknown): string => {
    let errorMessage = 'Произошла непредвиденная ошибка';
    if (err instanceof AxiosError) {
      errorMessage = err.response?.data?.message || 'Ошибка при запросе к серверу';
    } else if (err instanceof Error) {
      errorMessage = err.message;
    }
    setError(errorMessage);
    return errorMessage;
  }

  const login = async (loginData: LoginInterface) => {
    setIsLoading(true);
    try {
      const { data } = await axiosInstance.post<AuthResponseInterface>('/auth/login', loginData);
      await handleAuthSuccess(data.accessToken);
    } catch (err) {
      throw new Error(handleError(err));
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: CreateUserRequestInterface) => {
    setIsLoading(true);
    try {
      await axiosInstance.post('/auth/register', userData);
      setError(null);
    } catch (err) {
      throw new Error(handleError(err));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('accessToken');
    delete axiosInstance.defaults.headers.common['Authorization'];
    setError(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading, error, axiosInstance }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth должен использоваться внутри AuthProvider');
  }
  return context;
};