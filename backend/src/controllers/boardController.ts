import type { Request, Response } from "express";
import prisma from "../prismaClient";
import { UpdateBoardSchema, CreateBoardSchema } from "../schemas/boardSchemas";
import { validateRequestSchema } from "../utils/validateRequestSchema";
import {
  updateColumnNameById,
  createBoardByUserId,
  getBoardByUserIdAndBoardId,
  deleteColumnById,
  updateBoardNameByBoardId,
  deleteBoardByBoardId,
  createColumnByUserIdAndBoardId,
} from "../services/boardServices";

export const getBoard = async (req: Request, res: Response) => {
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

export const getBoards = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const boards = await prisma.board.findMany({
      where: {
        userId: Number(userId),
      },
    });

    res.status(200).json({ boards });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error });
    }
  }
};

export const updateBoard = async (req: Request, res: Response) => {
  const { userId, boardId } = req.params;
  const validatedData = validateRequestSchema(UpdateBoardSchema, req, res);

  if (!validatedData) {
    return;
  }
  const { name, columns } = validatedData;

  try {
    if (name) {
      await updateBoardNameByBoardId(Number(boardId), name);
    }
    for (const column of columns) {
      if (column.toDelete && column.id) {
        await deleteColumnById(column.id);
      } else if (!column.id) {
        await createColumnByUserIdAndBoardId(Number(userId), Number(boardId), column.name);
      } else {
        await updateColumnNameById(column.id, column.name);
      }
    }

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

export const createBoard = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const validatedData = validateRequestSchema(CreateBoardSchema, req, res);

  if (!validatedData) {
    return;
  }
  const { name, columnNames } = validatedData;

  try {
    const newBoard = await createBoardByUserId(Number(userId), name);

    const columnsData = columnNames.map((columnName: string) => {
      return {
        userId: Number(userId),
        boardId: newBoard.boardId,
        name: columnName,
      };
    });

    await prisma.column.createMany({
      data: columnsData,
    });

    const board = await getBoardByUserIdAndBoardId(Number(userId), newBoard.boardId);

    res.status(201).json({ board });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: error });
    }
  }
};

export const deleteBoard = async (req: Request, res: Response) => {
  const { boardId } = req.params;
  try {
    await deleteBoardByBoardId(Number(boardId));
    res.status(200).json({ message: "Successfully deleted board" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error });
    }
  }
};
