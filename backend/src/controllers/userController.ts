import type { Request, Response } from "express";
import prisma from "../prismaClient";

export const updateUsername = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { username: newUsername } = req.body;

  const existingUsername = await prisma.user.findUnique({
    where: {
      username: newUsername,
    },
  });

  if (existingUsername) {
    return res.status(400).json({ error: "Username already exists" });
  }

  try {
    await prisma.user.update({
      where: {
        id: Number(userId),
      },
      data: {
        username: newUsername,
      },
    });
    res.status(200).json({ message: "Username updated successfully" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error });
    }
  }
};
