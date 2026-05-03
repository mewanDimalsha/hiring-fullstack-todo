import axios from "axios";
import {
  type Todo,
  type CreateTodoPayload,
  type UpdateTodoPayload,
} from "../types/todo.types";

// All API calls go through this one file
// If the backend URL changes, you only change it here
const API = axios.create({
  baseURL: "http://localhost:5001/api",
});

export const todoApi = {
  getAll: () => API.get<Todo[]>("/todos"),

  create: (data: CreateTodoPayload) => API.post<Todo>("/todos", data),

  update: (id: string, data: UpdateTodoPayload) =>
    API.put<Todo>(`/todos/${id}`, data),

  toggleDone: (id: string) => API.patch<Todo>(`/todos/${id}/done`),

  delete: (id: string) => API.delete(`/todos/${id}`),
};
