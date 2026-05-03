// This matches exactly what the backend sends back
export interface Todo {
  _id: string;
  title: string;
  description?: string;
  done: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTodoPayload {
  title: string;
  description?: string;
}

export interface UpdateTodoPayload {
  title?: string;
  description?: string;
}
