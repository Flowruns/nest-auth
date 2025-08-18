export interface CreateUserRequestInterface {
  login: string;
  password: string;
  name?: string;
  surName?: string;
  role?: string;
}

export interface LoginInterface {
  login: string;
  password: string;
}

export interface AuthResponseInterface {
  accessToken: string;
}

export enum UserRole {
  User = "user",
  SuperAdmin = "superAdmin"
}

export interface UserInterface {
  userId: string;
  login: string;
  name: string;
  surName: string;
  role: UserRole;
  createdAt: string;
}

export type CreateUserInterface = {
  name?: string;
  login: string;
  password: string;
  surName?: string;
  role?: UserRole;
};

export type UpdateUserInterface = {
  login: string;
  name?: string;
  surName?: string;
};

export type ChangePasswordInterface = {
  currentPassword: string;
  newPassword: string;
};

export interface ApiError {
  message: string;
  statusCode: number;
  error: string;
}

