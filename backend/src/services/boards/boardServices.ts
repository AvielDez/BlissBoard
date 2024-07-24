import prisma from "../../prismaClient";

export const getBoardByUserIdAndBoardId = async (userId: number, boardId: number) => {
  try {
    return await prisma.board.findFirst({
      where: {
        userId: Number(userId),
        boardId: boardId,
      },
      include: {
        columns: {
          include: {
            tasks: true,
          },
        },
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Unable to retrieve board ${boardId}: ${error.message}`);
    } else {
      throw error;
    }
  }
};

export const createBoardByUserId = async (userId: number, name: string) => {
  try {
    return await prisma.board.create({
      data: {
        userId: Number(userId),
        name,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Unable to create board: ${error.message}`);
    } else {
      throw error;
    }
  }
};

export const updateColumnNameById = async (columnId: number, name: string) => {
  try {
    return await prisma.column.update({
      where: {
        columnId,
      },
      data: {
        name,
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

export const deleteTasksByColumnId = async (columnId: number) => {
  try {
    await prisma.task.deleteMany({
      where: {
        columnId,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Unable to delete tasks: ${error.message}`);
    } else {
      throw error;
    }
  }
};

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
