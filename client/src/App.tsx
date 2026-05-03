import { useTodos } from "../src/hooks/useTodos";
import TodoForm from "../src/components/TodoForm";
import TodoList from "../src/components/TodoList";

function App() {
  const {
    todos,
    loading,
    error,
    createTodo,
    updateTodo,
    toggleDone,
    deleteTodo,
  } = useTodos();

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "0 16px" }}>
      <h1 style={{ marginBottom: "24px" }}>📝 My TODO App</h1>

      {/* Add new todo form */}
      <TodoForm onSubmit={createTodo} />

      {/* Error message */}
      {error && (
        <p
          style={{
            color: "red",
            backgroundColor: "#fff0f0",
            padding: "8px 12px",
            borderRadius: "4px",
            border: "1px solid #ffcccc",
          }}
        >
          ⚠️ {error}
        </p>
      )}

      {/* Loading state */}
      {loading ? (
        <p style={{ color: "#666" }}>Loading todos...</p>
      ) : (
        <TodoList
          todos={todos}
          onToggle={toggleDone}
          onDelete={deleteTodo}
          onUpdate={updateTodo}
        />
      )}
    </div>
  );
}

export default App;
