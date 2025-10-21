import { z } from "zod";

const accountSchema = z.object({
  userId: z.string().min(1, "User ID é obrigatório").trim(),
  name: z.string().min(1, "Nome é obrigatório").trim(),
  type: z.enum(["c", "d"], {
    message: "Tipo deve ser 'c' (crédito) ou 'd' (débito)",
  }),
  balance: z.number().min(0, "Saldo não pode ser negativo"),
});

export default accountSchema;
