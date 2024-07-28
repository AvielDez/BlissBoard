import { Router } from "express";
import { updateUsername } from "../controllers/userController";
import { getBoards, getBoard, createBoard, updateBoard, deleteBoard } from "../controllers/boardController";
import { createTask, deleteTask, updateTask } from "../controllers/taskController";

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

export default router;
