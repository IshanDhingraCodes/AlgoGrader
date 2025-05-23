import { z } from "zod";

const SignUpSchema = z.object({
  email: z
    .string()
    .email("Enter a valid email.")
    .transform((val) => val.toLowerCase()),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .regex(/[A-Z]/, "Password must include at least one uppercase letter.")
    .regex(/[0-9]/, "Password must include at least one number.")
    .regex(/[a-z]/, "Password must include at least one lowercase letter."),
  name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters.")
    .nonempty("Name is required."),
});

const SignInSchema = z.object({
  email: z
    .string()
    .email("Enter a valid email.")
    .transform((val) => val.toLowerCase()),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .regex(/[A-Z]/, "Password must include at least one uppercase letter.")
    .regex(/[0-9]/, "Password must include at least one number.")
    .regex(/[a-z]/, "Password must include at least one lowercase letter."),
});

export { SignUpSchema, SignInSchema };
