import type { Request, Response } from "express";
import prisma from "../prismaClient";
import { UpdateBoardRequestSchema, CreateBoardRequestSchema } from "../schemas/boardSchemas";
import { validateRequestSchema } from "../utils/validateRequestSchema";
import { createBoardService, getBoardService, updateBoardService, deleteBoardService } from "../services/boardServices";
import { updateColumnNameById, deleteColumnById, createColumn } from "../services/columnServices";

export const createBoard = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const validatedData = validateRequestSchema(CreateBoardRequestSchema, req, res);

  if (!validatedData) {
    return;
  }
  const { name, columnNames } = validatedData;

  try {
    const newBoard = await createBoardService({ userId, name });

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

    const board = await getBoardService({ userId, boardId: String(newBoard.boardId) });

    res.status(201).json({ board });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: error });
    }
  }
};

export const getBoard = async (req: Request, res: Response) => {
  const { userId, boardId } = req.params;

  try {
    const board = await getBoardService({ userId, boardId });

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
  const validatedData = validateRequestSchema(UpdateBoardRequestSchema, req, res);

  if (!validatedData) {
    return;
  }
  const { name, columns } = validatedData;

  try {
    if (name) {
      await updateBoardService({ boardId, name });
    }
    for (const column of columns) {
      if (column.toDelete && column.id) {
        await deleteColumnById(column.id);
      } else if (!column.id) {
        await createColumn({
          userId: Number(userId),
          boardId: Number(boardId),
          name: column.name,
        });
      } else {
        await updateColumnNameById({
          columnId: column.id,
          name: column.name,
        });
      }
    }

    const board = await getBoardService({ userId, boardId });

    res.status(200).json({ board });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error });
    }
  }
};

export const deleteBoard = async (req: Request, res: Response) => {
  const { boardId } = req.params;
  try {
    await deleteBoardService(boardId);
    res.status(200).json({ message: "Successfully deleted board" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error });
    }
  }
};
