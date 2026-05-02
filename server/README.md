# TODO App — Backend

REST API built with Node.js, Express, TypeScript, and MongoDB.

## Architecture

Request
→ Route (todo.routes.ts)
→ Validation Middleware (validate.ts + Zod)
→ Controller (todo.controller.ts)
→ Service (todo.service.ts)
→ Model (Todo.ts)
→ MongoDB Atlas

## API Endpoints

| Method | Endpoint            | Description        | Body                   |
| ------ | ------------------- | ------------------ | ---------------------- |
| GET    | /api/todos          | Get all todos      | —                      |
| POST   | /api/todos          | Create a todo      | { title, description } |
| PUT    | /api/todos/:id      | Update a todo      | { title, description } |
| PATCH  | /api/todos/:id/done | Toggle done status | —                      |
| DELETE | /api/todos/:id      | Delete a todo      | —                      |

## Setup and Run

```bash
cd server
npm install
cp .env.example .env
# Add your MongoDB Atlas URI to .env
npm run dev
```

Server runs on http://localhost:5001

## Environment Variables

Create a `.env` file in the server folder:
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/tododb
PORT=5001

## MongoDB Atlas Setup

1. Go to https://cloud.mongodb.com
2. Create a free cluster
3. Click Connect → Drivers → copy the URI
4. Replace password in the URI
5. Go to Network Access → Add IP → Allow from anywhere (0.0.0.0/0)

## Assumptions and Limitations

- No authentication — all todos are shared
- No pagination — returns all todos at once
- MongoDB Atlas required — no local MongoDB support in Docker
