# hiring-fullstack-todo

A full-stack TODO app built with React, Node.js, Express, MongoDB, and TypeScript.

## Tech Stack

| Layer    | Technology                                    |
| -------- | --------------------------------------------- |
| Frontend | React, TypeScript, Vite, React Hook Form, Zod |
| Backend  | Node.js, Express, TypeScript, Zod             |
| Database | MongoDB Atlas                                 |
| DevOps   | Docker, Docker Compose, Nginx                 |

## Architecture

React (Vite) → Express API → MongoDB Atlas
↕ ↕
React Hook Form Zod Validation
Zod Controller/Service

## Run with Docker

Make sure Docker Desktop is installed and running.

```bash
# Clone the repo
git clone https://github.com/mewanDimalsha/hiring-fullstack-todo.git
cd hiring-fullstack-todo

# Add your MongoDB URI to server/.env
echo "MONGO_URI=your_atlas_uri_here" > server/.env
echo "PORT=5001" >> server/.env

# Run everything
docker-compose up --build
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5001

## Run Manually

See `/client/README.md` and `/server/README.md` for manual setup.

## Features

- View all todos
- Create a todo with title and optional description
- Edit a todo inline
- Mark a todo as done or undone
- Delete a todo
- Form validation on both frontend and backend
- Loading skeletons and error messages
- Optimistic UI updates
