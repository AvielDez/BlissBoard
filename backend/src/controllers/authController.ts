import type { Request, Response } from "express";
import prisma from "../prismaClient";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import env from "../config/config";
import { generateUniqueUsername } from "../services/authServices";

export const register = async (req: Request, res: Response) => {
  const { email, password, name, username } = req.body;

  try {
    // Check if the email already exists
    const existingEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (existingEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userUsername = username || (await generateUniqueUsername());

    const user = await prisma.user.create({
      data: {
        email,
        name,
        username: userUsername,
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
  const jwtSecret = env.JWT_SECRET;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        sub: user.id,
        email: user.email,
        name: user.name,
      },
      jwtSecret,
      {
        algorithm: "HS256",
        expiresIn: "1h",
      }
    );

    await prisma.user.update({
      where: {
        email,
      },
      data: {
        lastLogin: new Date(),
      },
    });

    res.status(200).json({
      accessToken: token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        username: user.username,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
