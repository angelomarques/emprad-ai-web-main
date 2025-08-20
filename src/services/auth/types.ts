export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface AuthError {
  message: string;
  field?: string;
}
