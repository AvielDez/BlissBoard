import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import env from "../config/config";

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.sendStatus(401);
  } else {
    jwt.verify(token, env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(401);
      }

      if (user) {
        req.user = user;
      }

      next();
    });
  }
};
