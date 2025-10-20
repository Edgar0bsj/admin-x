import { z } from "zod";

const cardSchema = z.object({
  idName: z.string().min(1, "O campo 'idName' não pode estar vazio."),
  title: z.string().min(1, "O campo 'title' não pode estar vazio."),
  description: z.string().min(1, "O campo 'description' não pode estar vazio."),
  icon: z.string().optional(),
  color: z.string().min(1, "O campo 'color' não pode estar vazio."),
  badge: z.string().min(1, "O campo 'badge' não pode estar vazio."),
  stats: z
    .object({
      label: z.string().optional(),
      value: z.string().optional(),
    })
    .optional(),
});

export default cardSchema;
