'use client';

import { useState, useEffect, useCallback } from 'react';
import { getAllUsers } from '@/lib/api';
import { UserInterface } from '@/types/auth.types';

export function useUsers() {
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllUsers();

      if (response.success && response.data) {
        setUsers(response.data);
      } else {
        setError(response.message || 'Не удалось получить данные пользователей');
        setUsers([]);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Произошла неизвестная ошибка при загрузке пользователей');
      }
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { users, loading, error, fetchUsers };
}