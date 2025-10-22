import { z } from "zod";

const categorySchema = z.object({
  userId: z
    .string()
    .min(1, "ID do usuário é obrigatório")
    .regex(/^[a-f\d]{24}$/i, "ID do usuário deve ser um ObjectId válido"),

  name: z
    .string()
    .min(1, "Nome da categoria é obrigatório")
    .max(50, "Nome da categoria deve ter no máximo 50 caracteres")
    .trim(),

  color: z
    .string()
    .min(1, "Cor é obrigatória")
    .regex(
      /^#[0-9A-Fa-f]{6}$/,
      "Cor deve ser um código hexadecimal válido (ex: #FF6B6B)"
    ),

  icon: z
    .string()
    .min(1, "Ícone é obrigatório")
    .max(10, "Ícone deve ter no máximo 10 caracteres"),

  type: z.enum(["receita", "despesa"], {
    message: "Tipo deve ser 'receita' ou 'despesa'",
  }),
});

export type Category = z.infer<typeof categorySchema>;

export default categorySchema;
