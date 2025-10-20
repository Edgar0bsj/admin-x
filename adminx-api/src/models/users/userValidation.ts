import { z } from "zod";

export const createUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(10, "Nome deve ter pelo menos 10 caracteres")
    .max(30, "Nome deve ter no máximo 30 caracteres")
    .transform((val) => val.toLowerCase()),

  email: z
    .string()
    .email("Email deve ter um formato válido")
    .transform((val) => val.toLowerCase()),

  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export const updateUserSchema = createUserSchema.partial();

export const loginSchema = z.object({
  email: z
    .string()
    .email("Email deve ter um formato válido")
    .transform((val) => val.toLowerCase()),

  passwordHash: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

// Types
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
