import { Router } from "express";
import authRoutes from "./authRoutes";

const router = Router();

router.use("/auth", authRoutes);

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
 * Columns
 * POST   - /users/:userId/columns - create a new column,
 * PUT    - /users/:userId/columns/:columnId - update column info by specified columnId (name, time of update, update all task status to new name)
 * DELETE - /users/:userId/columns/:columnId - delete column and all data within it. Cascade Delete
 *
 * Tasks - Tasks endpoints for handle managing subtasks as the subtask edits are only accessible through the task forms
 * POST   - /users/:userId/tasks - create a new task (name, status, subtasks)
 * GET    - /users/:userId/tasks/:taskId - get task with subtasks,
 * PUT    - /users/:userId/tasks/:taskId - update task info by specified taskId (name, time of update, status, subtasks)
 * DELETE - /users/:userId/tasks/:taskId - delete task and all data within it. Cascade Delete
 */
