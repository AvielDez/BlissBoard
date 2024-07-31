import type { Request, Response } from "express";
import { validateRequestSchema } from "../utils/validateRequestSchema";
import { UpdateSubtaskRequestSchema } from "../schemas/subtaskSchemas";
import { updateSubtaskCompletedService } from "../services/subtaskServices";

export const updateSubtaskCompleted = async (req: Request, res: Response) => {
  const { subtaskId } = req.params;
  const validatedData = validateRequestSchema(UpdateSubtaskRequestSchema, req, res);

  if (!validatedData) {
    return;
  }
  const { isCompleted } = validatedData;

  try {
    const updatedSubtaskCompleted = await updateSubtaskCompletedService({ subtaskId, isCompleted });

    res.status(200).json({ updatedSubtaskCompleted });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: error });
    }
  }
};
