import { useToast } from "@/components/ui/use-toast";
import { api } from "@/lib/api-client";
import { useAuth, User } from "@/stores/auth-store";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";

type LoginCredentials = {
  contactNumberOrEmail: string;
  password: string;
};

export function useLogin() {
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      try {
        const response = await api.post("/auth/login", {
          username: credentials.contactNumberOrEmail,
          password: credentials.password,
        });
        return response.data;
      } catch (error) {
        if (isAxiosError(error)) {
          throw new Error(
            error.response?.data?.messages || "Log in failed. Please try again."
          );
        } else {
          throw new Error(
            "An unexpected error occurred. Please try again later."
          );
        }
      }
    },
    onSuccess: (user: User) => {
      login(user);
      navigate("/");
      toast({ description: "Logged in" });
    },
    onError: (error: Error) => {
      console.log(error);
      toast({ description: error.message, variant: "destructive" });
    },
  });
}
