import type { Request, Response } from "express";
import prisma from "../prismaClient";
import { UpdateBoardSchema, CreateBoardSchema } from "../types/schemas/board/boardSchemas";
import { validateRequestSchema } from "../utils/validateRequestSchema";
import { updateColumnNameById, createBoardByUserId, getBoardByUserIdAndBoardId } from "../services/boards/boardServices";

// * Boards
// * GET    - /users/:userId/boards/- get all boards
// * POST   - /users/:userId/boards - create a new board
// * GET    - /users/:userId/boards/:boardId - get all data within a board by specified boardId up to tasks.
// * PUT    - /users/:userId/boards/:boardId - update board info by specified boardId (name, time of update)
// * DELETE - /users/:userId/boards/:boardId - delete board and all data within it. Cascade Delete

export const getBoard = async (req: Request, res: Response) => {
  const { userId, boardId } = req.params;

  try {
    const board = await prisma.board.findMany({
      where: {
        userId: Number(userId),
        boardId: Number(boardId),
      },
      include: {
        columns: true,
      },
    });

    res.status(200).json({ board });
  } catch (error) {
    if (error instanceof ErrorEvent) {
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
    if (error instanceof ErrorEvent) {
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
      const board = await updateColumnNameById(Number(boardId), name);
      res.status(201).json({ board });
    }

    for (let column of columns) {
      await updateColumnNameById(column.id, column.name);
    }
  } catch (error) {
    if (error instanceof ErrorEvent) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error });
    }
  }

  //loop through columnsToDelete and delete tasks within if any and column
  //update column names with columns.
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