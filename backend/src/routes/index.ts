import { Router } from "express";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", authenticateToken, userRoutes);

export default router;

/**
 * POST - /auth/register
 * POST - /auth/login
 *
 * PUT - /users/:userId/password
 * PUT - /users/:userId/profileImage
 *
 * Boards
 * GET    - /users/:userId/boards/- get all boards
 * POST   - /users/:userId/boards - create a new board
 * GET    - /users/:userId/boards/:boardId - get all data within a board by specified boardId up to tasks.
 * PUT    - /users/:userId/boards/:boardId - update board info by specified boardId (name, time of update)
 * DELETE - /users/:userId/boards/:boardId - delete board and all data within it. Cascade Delete
 *
 * Tasks - Tasks endpoints for managing subtasks as the subtask edits are only accessible through the task forms
 * POST   - /users/:userId/tasks - create a new task (name, status, subtasks)
 * PUT    - /users/:userId/tasks/:taskId - update task info by specified taskId (name, time of update, status, subtasks)
 * DELETE - /users/:userId/tasks/:taskId - delete task and all data within it. Cascade Delete
 *
 * Subtasks
 * PUT - /users/:userId/subtasks/:subtasksId - update isCompleted field in subtask
 */
