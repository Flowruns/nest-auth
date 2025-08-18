export const clearAuthToken = (): void => {
  localStorage.removeItem('accessToken');
};

export const logout = (): void => {
  clearAuthToken();
};