import prisma from "../prismaClient";
import { UpdateSubtaskCompletedType, UpdateSubtaskType, CreateSubtaskType } from "../schemas/subtaskSchemas";

export const createSubtaskService = async (data: CreateSubtaskType) => {
  const { userId, taskId, title, isCompleted } = data;
  try {
    await prisma.subtask.create({
      data: {
        userId: Number(userId),
        taskId: Number(taskId),
        title,
        isCompleted,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Unable to update subtask: ${error.message}`);
    } else {
      throw error;
    }
  }
};

export const updateSubtaskService = async (data: UpdateSubtaskType) => {
  const { subtaskId, title, isCompleted } = data;
  try {
    await prisma.subtask.update({
      where: {
        subtaskId,
      },
      data: {
        title,
        isCompleted,
        updatedAt: new Date(),
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Unable to update subtask: ${error.message}`);
    } else {
      throw error;
    }
  }
};

export const updateSubtaskCompletedService = async (data: UpdateSubtaskCompletedType) => {
  const { subtaskId, isCompleted } = data;
  try {
    await prisma.subtask.update({
      where: {
        subtaskId: Number(subtaskId),
      },
      data: {
        isCompleted,
        updatedAt: new Date(),
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Unable to update subtask: ${error.message}`);
    } else {
      throw error;
    }
  }
};

export const deleteSubtaskService = async (subtaskId: number) => {
  try {
    await prisma.subtask.delete({
      where: {
        subtaskId,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Unable to delete subtask: ${error.message}`);
    } else {
      throw error;
    }
  }
};
