import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";
import { useLogin } from "./use-login";
import { isAxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";

type Credentials = {
  fullName: string;
  birthDate: Date;
  contactNumber: string;
  email?: string;
  password: string;
};

export function useSignup() {
  const { mutate: login } = useLogin();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (credentials: Credentials) => {
      try {
        await api.post("/auth/users", {
          ...credentials,
          birthDate: format(credentials.birthDate, "yyyy-MM-dd"),
        });
        return credentials;
      } catch (error) {
        if (isAxiosError(error)) {
          throw new Error(
            error.response?.data.message || "Sign up failed. Please try again."
          );
        } else {
          throw new Error("Something went wrong. Please try again later.");
        }
      }
    },
    onSuccess: (credentials) => {
      login({
        contactNumberOrEmail: credentials.contactNumber,
        password: credentials.password,
      });
    },

    onError: (error: Error) => {
      toast({ description: error.message });
    },
  });
}
