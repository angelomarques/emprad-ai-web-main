import { api } from "@/lib/api";
import { User } from "@/stores/auth-store";
import { LoginCredentials, LoginResponse } from "./types";

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  },

  async getCurrentUser(): Promise<User> {
    const response = await api.get("/auth/me");
    return response.data;
  },

  async refreshToken(): Promise<{ token: string }> {
    const response = await api.post("/auth/refresh");
    return response.data;
  },
};
