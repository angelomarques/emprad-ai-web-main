import { useQuery } from "@tanstack/react-query";
import { authService } from "./index";

export const useCurrentUserQuery = () => {
  return useQuery({
    queryKey: ["user", "current"],
    queryFn: authService.getCurrentUser,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};

export const useRefreshTokenQuery = () => {
  return useQuery({
    queryKey: ["auth", "refresh"],
    queryFn: authService.refreshToken,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 1,
  });
};
