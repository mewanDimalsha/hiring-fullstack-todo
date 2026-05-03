import { useState, useEffect, useCallback } from "react";
import { type Todo } from "../types/todo.types";
import { todoApi } from "../api/todo.api";
import { type TodoFormValues } from "../validators/todo.validator";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useCallback prevents fetchTodos from being recreated on every render
  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await todoApi.getAll();
      setTodos(data);
    } catch {
      setError("Failed to load todos. Is the server running?");
    } finally {
      setLoading(false);
    }
  }, []); // empty array = only created once

  // Correct pattern — call async function inside the effect
  useEffect(() => {
    void fetchTodos();
  }, [fetchTodos]);

  const createTodo = async (formData: TodoFormValues) => {
    try {
      const { data } = await todoApi.create(formData);
      setTodos((prev) => [data, ...prev]);
      // no error thrown = form will reset ✅
    } catch {
      setError("Failed to create todo");
      throw new Error("Failed to create todo"); // re-throw so form doesn't reset on failure
    }
  };

  const updateTodo = async (id: string, formData: TodoFormValues) => {
    try {
      const { data } = await todoApi.update(id, formData);
      setTodos((prev) => prev.map((t) => (t._id === id ? data : t)));
    } catch {
      setError("Failed to update todo");
    }
  };

  const toggleDone = async (id: string) => {
    try {
      // Optimistic update — change UI immediately
      setTodos((prev) =>
        prev.map((t) => (t._id === id ? { ...t, done: !t.done } : t)),
      );
      await todoApi.toggleDone(id);
    } catch {
      setError("Failed to toggle todo");
      void fetchTodos(); // revert on failure
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      // Optimistic update — remove immediately
      setTodos((prev) => prev.filter((t) => t._id !== id));
      await todoApi.delete(id);
    } catch {
      setError("Failed to delete todo");
      void fetchTodos(); // revert on failure
    }
  };

  return {
    todos,
    loading,
    error,
    createTodo,
    updateTodo,
    toggleDone,
    deleteTodo,
  };
}
