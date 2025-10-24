import { z } from "zod";
import mongoose from "mongoose";

const budgetSchema = z
  .object({
    userId: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
      message: "userId inválido",
    }),
    categoryId: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
      message: "categoryId inválido",
    }),
    amount: z.number().positive("O valor deve ser maior que zero"),
    period: z.enum(["mensal", "semanal", "anual"]),
    startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: "Data inicial inválida",
    }),
    endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: "Data final inválida",
    }),
  })
  .refine((data) => new Date(data.endDate) >= new Date(data.startDate), {
    message: "A data final deve ser igual ou posterior à data inicial",
  });

export type Budget = z.infer<typeof budgetSchema>;
export const budgetValidation = budgetSchema;
