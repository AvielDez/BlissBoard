import type { Request, Response } from "express";
import z from "zod";

export const validateRequestSchema = <T extends z.ZodTypeAny>(schema: T, req: Request, res: Response): z.infer<T> | null => {
  const validationResult = schema.safeParse(req.body);
  if (!validationResult.success) {
    return res.status(400).json({ error: validationResult.error.errors });
  }
  return validationResult.data;
};
