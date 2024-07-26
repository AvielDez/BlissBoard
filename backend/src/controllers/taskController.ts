import type { Request, Response } from "express";
import prisma from "../prismaClient";
import { UpdateBoardSchema, CreateBoardSchema } from "../schemas/boardSchemas";
import { validateRequestSchema } from "../utils/validateRequestSchema";
import {
  updateColumnNameById,
  createBoardByUserId,
  getBoardByUserIdAndBoardId,
  deleteColumnById,
  deleteTasksByColumnId,
  updateBoardNameByBoardId,
  deleteBoardByBoardId,
  createColumnByUserIdAndBoardId,
} from "../services/boardServices";
/*
 * Tasks - Tasks endpoints for managing subtasks as the subtask edits are only accessible through the task forms
 * POST   - /users/:userId/tasks - create a new task (name, status, subtasks)
 * GET    - /users/:userId/tasks/:taskId - get task with subtasks,
 * PUT    - /users/:userId/tasks/:taskId - update task info by specified taskId (name, time of update, status, subtasks)
 * DELETE - /users/:userId/tasks/:taskId - delete task and all data within it. Cascade Delete
 */

export const createTask = async (req: Request, res: Response) => {
  const { userId, boardId } = req.params;

  try {
    const board = await getBoardByUserIdAndBoardId(Number(userId), Number(boardId));

    res.status(200).json({ board });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error });
    }
  }
};
