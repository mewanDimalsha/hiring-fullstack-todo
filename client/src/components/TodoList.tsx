import { type Todo } from "../types/todo.types";
import { type TodoFormValues } from "../validators/todo.validator";
import TodoItem from "./TodoItem";

interface Props {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, data: TodoFormValues) => Promise<void>;
}

export default function TodoList({
  todos,
  onToggle,
  onDelete,
  onUpdate,
}: Props) {
  if (todos.length === 0) {
    return <p style={{ color: "#999" }}>No todos yet. Add one above!</p>;
  }

  return (
    <div>
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}
