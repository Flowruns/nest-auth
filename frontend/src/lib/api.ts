import {
  ApiError,
  ChangePasswordInterface,
  CreateUserInterface,
  UserInterface,
} from '@/types/auth.types';
import { ApiResponse } from '@/types/api.types';
import { UpdateUserFormData } from '@/hooks/useUpdateUser';

const getToken = (): string | null => {
  return localStorage.getItem('accessToken');
};

const request = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const response = await fetch(`/api${url}`, { ...options, headers });

  if (!response.ok) {
    const error: ApiError = await response.json();
    throw new Error(error.message || 'Что-то пошло не так');
  }

  if (response.status === 204 || response.headers.get('content-length') === '0') {
    return null as T;
  }

  return response.json() as Promise<T>;
};

export const getAllUsers = (): Promise<ApiResponse<UserInterface[]>> => {
  return request<ApiResponse<UserInterface[]>>('/users', { method: 'GET' });
};

export const createUser = (data: CreateUserInterface): Promise<UserInterface> => {
  return request<UserInterface>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const updateUser = (userId: string, data: UpdateUserFormData): Promise<UserInterface> => {
  return request<UserInterface>(`/users/${userId}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
};

export const deleteUser = (userId: string): Promise<null> => {
  return request<null>(`/users/${userId}`, {
    method: 'DELETE',
  });
};

export const changePassword = (userId: string, data: ChangePasswordInterface): Promise<null> => {
  return request<null>(`/users/${userId}/password`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
};