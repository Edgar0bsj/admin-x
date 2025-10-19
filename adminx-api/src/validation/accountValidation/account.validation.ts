import { z } from "zod";

const accountSchema = z.object({
  name: z.string().trim().toLowerCase(),
  type: z.literal(["c", "d"]),
  balance: z.number().gt(0),
});

export default accountSchema;
