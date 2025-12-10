import { z } from "zod";

export const emailSchema = z.email({
  pattern: z.regexes.rfc5322Email,
  message: "Invalid email address",
});

export const passwordSchema = z
  .string()
  .trim()
  .min(8, "Password must be at least 8 characters long");

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  avatar: z.string().optional().nullable(),
  name: z.string().trim().min(5),
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
