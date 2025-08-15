const getToken = (): string | null => {
  return localStorage.getItem('accessToken');
};

const request = async (url: string, options: RequestInit = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const response = await fetch(`/api${url}`, { ...options, headers });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Что-то пошло не так');
  }

  if (response.status === 204 || response.headers.get('content-length') === '0') {
    return null;
  }

  return response.json();
};

export const getAllUsers = async () => {
  const response = await request('/users', { method: 'GET' });
  return response;
};

export const createUser = (data: any) => request('/auth/register', {
  method: 'POST',
  body: JSON.stringify(data),
});