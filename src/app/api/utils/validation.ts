import { z } from "zod";

export const transactionSchema = z.object({
  amount: z.number(),
  title: z.string().min(1, "Title is required"),
  message: z.string().optional(),
  date: z.string().datetime().optional(),
  categoryId: z.number().int().positive("Category ID must be positive"),
});
