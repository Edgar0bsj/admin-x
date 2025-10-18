import { z } from "zod";

const registerValidation = z.object({
  name: z
    .string()
    .min(10, "O nome precisa ter no mínimo 10 caracteres")
    .max(50, "O nome precisa ter no máximo 30 caracteres"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha precisa ter no mínimo 6 caracteres"),
});

export default registerValidation;
