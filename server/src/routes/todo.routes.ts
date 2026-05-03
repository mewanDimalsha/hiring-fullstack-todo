import { Router } from "express";
import { todoController } from "../controllers/todo.controller";
import { validate } from "../middleware/validate";
import {
  createTodoSchema,
  updateTodoSchema,
} from "../validators/todo.validator";

const router = Router();

// Each line = one API endpoint
// validate() runs BEFORE the controller — blocks bad data early
router.get("/", todoController.getAll.bind(todoController));

router.post(
  "/",
  validate(createTodoSchema),
  todoController.create.bind(todoController),
);

router.put(
  "/:id",
  validate(updateTodoSchema),
  todoController.update.bind(todoController),
);

router.patch("/:id/done", todoController.toggleDone.bind(todoController));

router.delete("/:id", todoController.delete.bind(todoController));

export default router;
