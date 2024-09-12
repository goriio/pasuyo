import { AuthenticationLayout } from "@/components/layouts/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/hooks/use-login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { z } from "zod";

const loginFormSchema = z.object({
  contactNumberOrEmail: z.string().min(2).max(50),
  password: z.string(),
});

export function Login() {
  const { mutate: login, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
  });

  async function onSubmit(credentials: z.infer<typeof loginFormSchema>) {
    await login(credentials);
  }

  return (
    <AuthenticationLayout title="Login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-10 space-y-5">
          <div className="space-y-1">
            <Label htmlFor="contact-number-or-email">
              Contact Number or Email
            </Label>
            <Input
              type="text"
              id="contact-number-or-email"
              placeholder="Contact Number or Email"
              {...register("contactNumberOrEmail")}
            />
            <span className="text-sm text-red-600">
              {errors.contactNumberOrEmail?.message}
            </span>
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              placeholder="Password"
              {...register("password")}
            />
            <span className="text-sm text-red-600">
              {errors.password?.message}
            </span>
          </div>
        </div>
        <Button type="submit" fullWidth disabled={isPending}>
          Login
        </Button>
      </form>
      <div className="text-sm text-center">
        Don't have an account?{" "}
        <NavLink to="/signup" className="underline">
          Sign up
        </NavLink>
      </div>
    </AuthenticationLayout>
  );
}
