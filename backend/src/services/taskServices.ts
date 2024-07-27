import prisma from "../prismaClient";
import { CreateTaskType } from "../schemas/taskSchemas";

export const deleteTaskByTaskId = async (taskId: number) => {
  try {
    await prisma.task.delete({
      where: {
        taskId,
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

export const updateTaskByTaskId = async (taskId: number) => {
  try {
    await prisma.task.update({
      where: {
        taskId,
      },
      data: {
        //Data to update
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
export const createTask = async (data: CreateTaskType) => {
  const { columnId, userId, title, description, status } = data;
  try {
    const newTask = await prisma.task.create({
      data: {
        userId,
        columnId,
        description,
        title,
        status,
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
