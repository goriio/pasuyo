import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthenticationLayout } from "@/components/layouts/auth-layout";
import { NavLink } from "react-router-dom";
import { useSignup } from "@/hooks/use-signup";

const signUpFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name is required" }).max(50),
  birthDate: z.coerce.date(),
  contactNumber: z
    .string()
    .regex(
      /^09\d{9}$/,
      "Phone number must start with 09 and be followed by exactly 9 digits"
    ),
  email: z.string().email({ message: "Email is invalid" }).optional(),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
  });

  const { mutate: signup, isPending } = useSignup();

  function onSubmit(credentials: z.infer<typeof signUpFormSchema>) {
    signup(credentials);
  }

  return (
    <AuthenticationLayout title="Create your account">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-10 space-y-5">
          <div className="space-y-1">
            <Label htmlFor="full-name">Full name</Label>
            <Input
              type="text"
              id="full-name"
              placeholder="Full name"
              {...register("fullName")}
            />
            <span className="text-sm text-red-600">
              {errors.fullName?.message}
            </span>
          </div>
          <div className="space-y-1">
            <Label htmlFor="birthdate">Birthdate</Label>
            <Input
              type="date"
              id="birthdate"
              placeholder="Birthdate"
              {...register("birthDate")}
            />
            <span className="text-sm text-red-600">
              {errors.birthDate?.message}
            </span>
          </div>
          <div className="space-y-1">
            <Label htmlFor="contact-number">Contact number</Label>
            <Input
              type="tel"
              id="contact-number"
              placeholder="Contact number"
              maxLength={11}
              {...register("contactNumber")}
            />
            <div className="text-sm text-gray-700">
              Contact number must begin with 09
            </div>
            <span className="text-sm text-red-600">
              {errors.contactNumber?.message}
            </span>
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email (Optional)</Label>
            <Input
              type="email"
              id="email"
              placeholder="Email (Optional)"
              {...register("email")}
            />
            <span className="text-sm text-red-600">
              {errors.email?.message}
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
          Sign up
        </Button>
      </form>
      <div className="text-sm text-center">
        Already have an account?{" "}
        <NavLink to="/login" className="underline">
          Login
        </NavLink>
      </div>
    </AuthenticationLayout>
  );
}
