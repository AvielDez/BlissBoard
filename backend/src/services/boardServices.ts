import prisma from "../prismaClient";
import { CreateBoardType, GetBoardType, UpdateBoardType } from "../schemas/boardSchemas";

export const getBoardService = async (data: GetBoardType) => {
  const { userId, boardId } = data;
  try {
    return await prisma.board.findFirst({
      where: {
        userId: Number(userId),
        boardId: Number(boardId),
      },
      include: {
        columns: {
          include: {
            tasks: {
              include: {
                subtasks: true,
              },
            },
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

export const createBoardService = async (data: CreateBoardType) => {
  const { userId, name } = data;
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

export const updateBoardService = async (data: UpdateBoardType) => {
  const { boardId, name } = data;

  try {
    await prisma.board.update({
      where: {
        boardId: Number(boardId),
      },
      data: {
        name,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Unable to update board name ${error.message}`);
    } else {
      throw error;
    }
  }
};

export const deleteBoardService = async (boardId: string) => {
  try {
    await prisma.board.delete({
      where: {
        boardId: Number(boardId),
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Unable to delete board ${error.message}`);
    } else {
      throw error;
    }
  }
};
