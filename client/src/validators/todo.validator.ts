import { z } from "zod";

export const todoFormSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be under 100 characters"),
  description: z
    .string()
    .max(500, "Description must be under 500 characters")
    .optional(),
});

// Define the type manually instead of inferring from zod
export type TodoFormValues = {
  title: string;
  description?: string;
};
