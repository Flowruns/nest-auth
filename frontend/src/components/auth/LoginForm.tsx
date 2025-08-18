'use client';

import { Stack } from '@mui/material';
import Input from '@/components/UI/Input';

interface LoginFormProps {
  formData: {
    login: string;
    password: string;
  };
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function LoginForm({ formData, handleInputChange }: LoginFormProps) {
  return (
    <Stack spacing={2} sx={{width: '100%'}}>
      <Input
        id="login"
        name="login"
        label="Логин"
        type="text"
        required
        autoFocus
        value={formData.login}
        onChange={handleInputChange}
      />
      <Input
        id="password"
        name="password"
        label="Пароль"
        type="password"
        required
        value={formData.password}
        onChange={handleInputChange}
      />
    </Stack>
  );
}