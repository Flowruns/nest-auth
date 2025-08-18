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
  name: string;
  surName: string;
  role: UserRole;
}

