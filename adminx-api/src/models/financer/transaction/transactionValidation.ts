import { z } from "zod";

const TransactionSchema = z.object({
  userId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "ID do usuário deve ser um ObjectId válido"),
  accountId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "ID da conta deve ser um ObjectId válido"),
  categoryId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "ID da categoria deve ser um ObjectId válido"),
  amount: z
    .number()
    .min(0.01, "O valor deve ser maior que zero")
    .max(9999999.99, "O valor é muito alto"),
  description: z
    .string()
    .min(1, "A descrição é obrigatória")
    .max(255, "A descrição deve ter no máximo 255 caracteres")
    .trim(),
  date: z.coerce
    .date()
    .max(new Date(), "A data não pode ser futura")
    .refine((date) => date instanceof Date && !isNaN(date.getTime()), {
      message: "Data inválida",
    }),
  type: z.enum(["despesa", "receita"], {
    message: 'Tipo deve ser "despesa" ou "receita"',
  }),
});

export const CreateTransactionSchema = TransactionSchema;

export const UpdateTransactionSchema = TransactionSchema.partial();

// Types
export type Transaction = z.infer<typeof TransactionSchema>;
export type CreateTransactionInput = z.infer<typeof CreateTransactionSchema>;
export type UpdateTransactionInput = z.infer<typeof UpdateTransactionSchema>;
