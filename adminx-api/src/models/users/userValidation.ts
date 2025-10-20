import { z } from "zod";

export const createUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(50, "Nome deve ter no máximo 50 caracteres")
    .transform((val) => val.toLowerCase()),

  email: z
    .string()
    .email("Email deve ter um formato válido")
    .transform((val) => val.toLowerCase()),

  passwordHash: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
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
