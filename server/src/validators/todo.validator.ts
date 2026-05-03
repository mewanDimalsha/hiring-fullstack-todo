import { z } from "zod";

// Zod schema for creating a todo
// This validates what the user sends to POST /api/todos
export const createTodoSchema = z.object({
  body: z.object({
    title: z
      .string({ error: "Title is required" })
      .min(1, "Title cannot be empty")
      .max(100, "Title must be under 100 characters"),
    description: z
      .string()
      .max(500, "Description must be under 500 characters")
      .optional(),
  }),
});

// Zod schema for updating a todo
// Used for PUT /api/todos/:id
export const updateTodoSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(1, "Title cannot be empty")
      .max(100, "Title must be under 100 characters")
      .optional(),
    description: z
      .string()
      .max(500, "Description must be under 500 characters")
      .optional(),
  }),
  params: z.object({
    id: z.string().min(1, "ID is required"),
  }),
});

// These types are automatically generated from the schemas above
// Use them in controllers/services so you don't have to repeat yourself
export type CreateTodoInput = z.infer<typeof createTodoSchema>["body"];
export type UpdateTodoInput = z.infer<typeof updateTodoSchema>["body"];
