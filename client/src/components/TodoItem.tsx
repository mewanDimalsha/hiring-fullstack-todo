import { useState } from "react";
import { type Todo } from "../types/todo.types";
import { type TodoFormValues } from "../validators/todo.validator";
import TodoForm from "./TodoForm";

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, data: TodoFormValues) => Promise<void>;
}

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
  onUpdate,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = async (data: TodoFormValues) => {
    await onUpdate(todo._id, data);
    setIsEditing(false); // close edit mode after saving
  };

  return (
    <div
      style={{
        padding: "12px",
        marginBottom: "8px",
        border: "1px solid #ddd",
        borderRadius: "6px",
        backgroundColor: todo.done ? "#f5f5f5" : "white",
        opacity: todo.done ? 0.7 : 1,
      }}
    >
      {isEditing ? (
        // Show edit form when editing
        <div>
          <TodoForm
            onSubmit={handleUpdate}
            defaultValues={{ title: todo.title, description: todo.description }}
            submitLabel="Save Changes"
          />
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        // Show todo details normally
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Checkbox to toggle done */}
          <input
            type="checkbox"
            checked={todo.done}
            onChange={() => onToggle(todo._id)}
            style={{ cursor: "pointer", width: "18px", height: "18px" }}
          />

          {/* Title and description */}
          <div style={{ flex: 1 }}>
            <p
              style={{
                margin: 0,
                fontWeight: "bold",
                textDecoration: todo.done ? "line-through" : "none", // strikethrough when done
                color: todo.done ? "#999" : "#000",
              }}
            >
              {todo.title}
            </p>
            {todo.description && (
              <p
                style={{
                  margin: "4px 0 0",
                  fontSize: "14px",
                  color: "#666",
                  textDecoration: todo.done ? "line-through" : "none",
                }}
              >
                {todo.description}
              </p>
            )}
          </div>

          {/* Action buttons */}
          <button
            onClick={() => setIsEditing(true)}
            style={{ padding: "4px 10px", cursor: "pointer" }}
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(todo._id)}
            style={{
              padding: "4px 10px",
              cursor: "pointer",
              backgroundColor: "#ff4444",
              color: "white",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
