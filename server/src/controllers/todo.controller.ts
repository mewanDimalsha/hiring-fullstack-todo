import { Request, Response } from "express";
import { todoService } from "../services/todo.service";

export class TodoController {
  async getAll(req: Request, res: Response) {
    try {
      const todos = await todoService.getAll();
      res.json(todos);
    } catch {
      res.status(500).json({ message: "Failed to fetch todos" });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const todo = await todoService.create(req.body);
      res.status(201).json(todo);
    } catch {
      res.status(500).json({ message: "Failed to create todo" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const todo = await todoService.update(id, req.body);
      if (!todo) return res.status(404).json({ message: "Todo not found" });
      res.json(todo);
    } catch {
      res.status(500).json({ message: "Failed to update todo" });
    }
  }

  async toggleDone(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const todo = await todoService.toggleDone(id);
      if (!todo) return res.status(404).json({ message: "Todo not found" });
      res.json(todo);
    } catch {
      res.status(500).json({ message: "Failed to toggle todo" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const todo = await todoService.delete(id);
      if (!todo) return res.status(404).json({ message: "Todo not found" });
      res.json({ message: "Todo deleted successfully" });
    } catch {
      res.status(500).json({ message: "Failed to delete todo" });
    }
  }
}

export const todoController = new TodoController();
