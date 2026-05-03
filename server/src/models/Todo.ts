import mongoose, { Document, Schema } from "mongoose";

// TypeScript interface — "type" for a Todo
export interface ITodo extends Document {
  title: string;
  description?: string;
  done: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TodoSchema = new Schema<ITodo>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    done: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Todo = mongoose.model<ITodo>("Todo", TodoSchema);
