import type { Request, Response } from "express";
import { validateRequestSchema } from "../utils/validateRequestSchema";
import { CreateTaskRequestSchema, UpdateTaskRequestSchema } from "../schemas/taskSchemas";
import { createTaskService, deleteTaskService, updateTaskService } from "../services/taskServices";
import { createSubtaskService, deleteSubtaskService, updateSubtaskService } from "../services/subtaskServices";
import prisma from "../prismaClient";

export const createTask = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const validatedData = validateRequestSchema(CreateTaskRequestSchema, req, res);

  if (!validatedData) {
    return;
  }

  try {
    const task = await createTaskService({ ...validatedData, userId });

    const subtasksData = validatedData.subtasks.map((subtaskTitle: string) => {
      return {
        userId: Number(userId),
        taskId: task.taskId,
        title: subtaskTitle,
        isCompleted: false,
      };
    });

    await prisma.subtask.createMany({
      data: subtasksData,
    });

    res.status(200).json({ task });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error });
    }
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const { userId, taskId } = req.params;
  const validatedData = validateRequestSchema(UpdateTaskRequestSchema, req, res);

  if (!validatedData) {
    return;
  }
  const { columnId, title, description, status, subtasks } = validatedData;

  try {
    await updateTaskService({ columnId, taskId, title, status, description });

    for (const subtask of subtasks) {
      if (subtask.toDelete && subtask.id) {
        await deleteSubtaskService(subtask.id);
      } else if (!subtask.id) {
        await createSubtaskService({
          userId,
          taskId,
          title: subtask.title,
          isCompleted: subtask.isCompleted,
        });
      } else {
        await updateSubtaskService({
          subtaskId: subtask.id,
          title: subtask.title,
          isCompleted: subtask.isCompleted,
        });
      }
    }

    res.status(200).json({ message: "Successfully updated task" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error });
    }
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const { taskId } = req.params;

  try {
    await deleteTaskService(taskId);

    res.status(200).json({ message: "Successfully deleted task" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error });
    }
  }
};
