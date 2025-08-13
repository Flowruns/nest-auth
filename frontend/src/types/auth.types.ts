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