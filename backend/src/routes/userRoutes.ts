import { Router } from "express";
import { updateUsername } from "../controllers/userController";
import { getBoards, getBoard, createBoard, updateBoard, deleteBoard } from "../controllers/boardController";
import { createTask, deleteTask, updateTask } from "../controllers/taskController";
import { updateSubtaskCompleted } from "../controllers/subtaskController";

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       200:
 *         description: User information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 firstname:
 *                   type: string
 *                 lastname:
 *                   type: string
 */

const router = Router();

router.put("/:userId/password", updateUsername);

//Boards
router.get("/:userId/boards", getBoards);
router.get("/:userId/boards/:boardId", getBoard);
router.post("/:userId/boards", createBoard);
router.put("/:userId/boards/:boardId", updateBoard);
router.delete("/boards/:boardId", deleteBoard);

//Tasks
router.post("/:userId/tasks", createTask);
router.put("/:userId/tasks/:taskId", updateTask);
router.delete("/tasks/:taskId", deleteTask);

//Subtasks
router.put("/subtasks/:subtaskId", updateSubtaskCompleted);

export default router;
