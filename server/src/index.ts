import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import todoRoutes from "./routes/todo.routes";

dotenv.config(); // loads .env file

const app = express();

// Middleware — runs on every request
app.use(cors()); // allow React app to connect
app.use(express.json()); // parse JSON request bodies

// Routes
app.use("/api/todos", todoRoutes);

// Health check — visit http://localhost:5000/ to confirm server works
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "TODO API is running!" });
});

// Global error handler — catches any unhandled errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI!;

// Connect to MongoDB first, then start the server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1); // stop the app if DB fails
  });
