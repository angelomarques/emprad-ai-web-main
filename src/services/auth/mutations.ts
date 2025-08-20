import { useAuthStore } from "@/stores/auth-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "./index";
import { LoginCredentials } from "./types";

export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const { login: storeLogin } = useAuthStore();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await authService.login(credentials);
      return response;
    },
    onSuccess: (data) => {
      // Update the auth store
      storeLogin(data);

      // Invalidate and refetch user-related queries
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  const { logout: storeLogout } = useAuthStore();

  return useMutation({
    mutationFn: async () => {
      storeLogout();
    },
    onSuccess: () => {
      // Clear all queries
      queryClient.clear();
    },
  });
};
