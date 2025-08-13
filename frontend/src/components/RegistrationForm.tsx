import { Stack } from '@mui/material';
import Input from '@/components/UI/Input';

interface RegistrationFormProps {
  formData: {
    login: string;
    password: string;
    name?: string;
    surName?: string;
  };
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function RegistrationForm({ formData, handleInputChange }: RegistrationFormProps) {
  return (
    <Stack spacing={2} sx={{width: '100%'}}>
      <Input
        id="login-reg"
        name="login"
        label="Логин"
        type="text"
        required
        value={formData.login}
        onChange={handleInputChange}
      />
      <Input
        id="password-reg"
        name="password"
        label="Пароль"
        type="password"
        required
        value={formData.password}
        onChange={handleInputChange}
      />
      <Input
        id="name"
        name="name"
        label="Имя"
        type="text"
        value={formData.name || ''}
        onChange={handleInputChange}
      />
      <Input
        id="surName"
        name="surName"
        label="Фамилия"
        type="text"
        value={formData.surName || ''}
        onChange={handleInputChange}
      />
    </Stack>
  );
}