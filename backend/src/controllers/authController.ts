import type { Request, Response } from "express";
import prisma from "../prismaClient";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import env from "../config/config";

export const register = async (req: Request, res: Response) => {
  const { email, password, name, username } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Check if the username already exists
    //TODO: We'll move this into a another controller
    const existingUsername = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUsername) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        name,
        username,
        password: hashedPassword,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user.id }, env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log(token);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
