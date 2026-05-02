import { Todo, ITodo } from "../models/Todo";
import { CreateTodoInput, UpdateTodoInput } from "../validators/todo.validator";

// Service contains ALL the business logic
// It's the only layer that talks to the database
// Controllers just call these methods
export class TodoService {
  // Get every todo, newest first
  async getAll(): Promise<ITodo[]> {
    return Todo.find().sort({ createdAt: -1 });
  }

  // Get one todo by its MongoDB ID
  async getById(id: string): Promise<ITodo | null> {
    return Todo.findById(id);
  }

  // Create a new todo
  async create(data: CreateTodoInput): Promise<ITodo> {
    return Todo.create(data);
  }

  // Update title/description of existing todo
  async update(id: string, data: UpdateTodoInput): Promise<ITodo | null> {
    return Todo.findByIdAndUpdate(
      id,
      data,
      { new: true, runValidators: true },
      // new: true → return updated doc, not old one
    );
  }

  // Flip done between true and false
  async toggleDone(id: string): Promise<ITodo | null> {
    const todo = await Todo.findById(id);
    if (!todo) return null;
    todo.done = !todo.done; // if true → false, if false → true
    return todo.save();
  }

  // Permanently delete a todo
  async delete(id: string): Promise<ITodo | null> {
    return Todo.findByIdAndDelete(id);
  }
}

// Export one single instance so all files share the same object
export const todoService = new TodoService();
