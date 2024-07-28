import prisma from "../prismaClient";
import { CreateTaskType, UpdateTaskType } from "../schemas/taskSchemas";

export const deleteTaskService = async (taskId: string) => {
  try {
    await prisma.task.delete({
      where: {
        taskId: Number(taskId),
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Unable to delete task: ${error.message}`);
    } else {
      throw error;
    }
  }
};

export const updateTaskService = async (data: UpdateTaskType) => {
  const { columnId, taskId, title, description, status } = data;
  const taskIdNumber = Number(taskId);
  try {
    await prisma.task.update({
      where: {
        taskId: taskIdNumber,
      },
      data: {
        columnId,
        title,
        description,
        status,
        updatedAt: new Date(),
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Unable to update task: ${error.message}`);
    } else {
      throw error;
    }
  }
};

export const createTaskService = async (data: CreateTaskType) => {
  const { columnId, userId, title, description, status } = data;
  try {
    const newTask = await prisma.task.create({
      data: {
        userId: Number(userId),
        columnId,
        description,
        title,
        status,
      },
    });
    return newTask;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Unable to create task: ${error.message}`);
    } else {
      throw error;
    }
  }
};
