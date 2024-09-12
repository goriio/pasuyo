import { useToast } from "@/components/ui/use-toast";
import { api } from "@/lib/api-client";
import { useAuth } from "@/stores/auth-store";
import { useMutation } from "@tanstack/react-query";

export function useLogout() {
  const { user, logout } = useAuth();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async () => {
      try {
        await api.post(
          "/auth/logout",
          {},
          {
            headers: { Authorization: `Token ${user?.token}` },
          }
        );
      } catch {
        throw new Error("Something went wrong.");
      }
    },
    onSuccess: () => {
      logout();
      toast({ description: "Your account has been logged out" });
    },
    onError: (error: Error) => {
      toast({ description: error.message, variant: "destructive" });
    },
  });
}
