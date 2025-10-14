import { z } from "zod";

const loginValidation = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha precisa ter no mínimo 6 caracteres"),
});

export default loginValidation;
