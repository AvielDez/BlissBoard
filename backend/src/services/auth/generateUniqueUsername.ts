import { nanoid } from "nanoid";
import prisma from "../../prismaClient";

export const generateUniqueUsername = async (length: number = 6): Promise<string> => {
  let username: string;
  let exists: boolean;

  do {
    username = `User ${nanoid(length)}`;
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    exists = !!user;
  } while (exists);

  return username;
};
