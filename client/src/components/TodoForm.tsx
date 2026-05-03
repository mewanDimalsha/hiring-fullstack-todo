import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  todoFormSchema,
  type TodoFormValues,
} from "../validators/todo.validator";

interface Props {
  onSubmit: (data: TodoFormValues) => Promise<void>;
  defaultValues?: TodoFormValues;
  submitLabel?: string;
}

export default function TodoForm({
  onSubmit,
  defaultValues,
  submitLabel = "Add TODO",
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TodoFormValues>({
    resolver: zodResolver(todoFormSchema),
    defaultValues: defaultValues ?? { title: "", description: "" },
  });

  const submit = async (data: TodoFormValues) => {
    try {
      await onSubmit(data);
      reset({ title: "", description: "" });
    } catch {
      // Don't reset if submission failed
    }
  };

  return (
    <div style={{ marginBottom: "2rem" }}>
      <div style={{ marginBottom: "8px" }}>
        <input
          {...register("title")}
          placeholder="What needs to be done? *"
          style={{
            padding: "8px",
            width: "100%",
            border: errors.title ? "2px solid red" : "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "14px",
            boxSizing: "border-box",
          }}
        />
        {errors.title && (
          <p style={{ color: "red", margin: "4px 0 0", fontSize: "13px" }}>
            {errors.title.message}
          </p>
        )}
      </div>

      <div style={{ marginBottom: "8px" }}>
        <input
          {...register("description")}
          placeholder="Description (optional)"
          style={{
            padding: "8px",
            width: "100%",
            border: errors.description ? "2px solid red" : "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "14px",
            boxSizing: "border-box",
          }}
        />
        {errors.description && (
          <p style={{ color: "red", margin: "4px 0 0", fontSize: "13px" }}>
            {errors.description.message}
          </p>
        )}
      </div>

      <button
        onClick={handleSubmit(submit)}
        disabled={isSubmitting}
        style={{
          padding: "8px 20px",
          backgroundColor: isSubmitting ? "#ccc" : "#1976d2",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: isSubmitting ? "not-allowed" : "pointer",
          fontSize: "14px",
        }}
      >
        {isSubmitting ? "Saving..." : submitLabel}
      </button>
    </div>
  );
}
