import prisma from "../prismaClient";
import { CreateColumnType, UpdateColumnNameType } from "../schemas/columnSchemas";

export const updateColumnNameById = async (data: UpdateColumnNameType) => {
  const { name, columnId } = data;
  try {
    return await prisma.column.update({
      where: {
        columnId,
      },
      data: {
        name,
        updatedAt: new Date(),
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Unable to update column: ${error.message}`);
    } else {
      throw error;
    }
  }
};

export const deleteColumnById = async (columnId: number) => {
  try {
    await prisma.column.delete({
      where: {
        columnId,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Unable to delete column: ${error.message}`);
    } else {
      throw error;
    }
  }
};

export const createColumn = async (data: CreateColumnType) => {
  const { name, boardId, userId } = data;
  try {
    await prisma.column.create({
      data: {
        name,
        boardId,
        userId,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Unable to create column ${error.message}`);
    } else {
      throw error;
    }
  }
};

export const createManyColumns = async (data: CreateColumnType) => {
  const { name, boardId, userId } = data;
  try {
    await prisma.column.create({
      data: {
        name,
        boardId,
        userId,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Unable to create column ${error.message}`);
    } else {
      throw error;
    }
  }
};

///TODO: Need to finish creating the createManyColumns function and schemas before moving on the task controller and services
