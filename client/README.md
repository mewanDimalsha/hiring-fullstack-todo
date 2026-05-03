# TODO App — Frontend

React frontend built with TypeScript, Vite, and React Hook Form.

## Architecture

App.tsx
├── useTodos.ts (hook) — all state and API logic
│ └── todo.api.ts — axios HTTP calls
├── TodoForm.tsx — add and edit form with Zod validation
├── TodoList.tsx — splits todos into pending and completed
└── TodoItem.tsx — single todo with edit, delete, toggle

## Setup and Run

```bash
cd client
npm install
npm run dev
```

Frontend runs on http://localhost:5173

Requires the backend running on http://localhost:5001

## Key Decisions

| Decision                    | Reason                                         |
| --------------------------- | ---------------------------------------------- |
| Vite over Create React App  | Faster, actively maintained                    |
| React Hook Form             | Minimal re-renders, easy validation            |
| Zod on frontend and backend | Same validation rules in both places           |
| Custom useTodos hook        | Keeps components clean and simple              |
| Optimistic updates          | Instant UI feedback without waiting for server |

## Assumptions and Limitations

- Backend must be running on port 5001
- No user authentication
- No pagination
