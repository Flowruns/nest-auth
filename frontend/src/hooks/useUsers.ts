'use client';

import { useState, useEffect, useCallback } from 'react';
import { getAllUsers } from '@/lib/api';

interface User {
  userId: string;
  login: string;
  name: string;
  surName: string;
  role: string;
}

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllUsers();
      setUsers(response.data || []);
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