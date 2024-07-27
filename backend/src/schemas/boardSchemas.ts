import z from "zod";

//Request Schemas

export const CreateBoardRequestSchema = z.object({
  name: z.string(),
  columnNames: z.array(z.string()),
});

export const UpdateBoardRequestSchema = z.object({
  name: z.string().optional(),
  columns: z.array(
    z.object({
      id: z.number().optional(),
      name: z.string(),
      toDelete: z.boolean().optional(),
    })
  ),
});

export type UpdateBoardRequestType = z.infer<typeof UpdateBoardRequestSchema>;
export type CreateBoarRequestType = z.infer<typeof CreateBoardRequestSchema>;

//Services Schemas

export const GetBoardSchema = z.object({
  userId: z.string(),
  boardId: z.string(),
});

export const CreateBoardSchema = z.object({
  userId: z.string(),
  name: z.string(),
});

export const UpdateBoardSchema = z.object({
  boardId: z.string(),
  name: z.string(),
});

export type GetBoardType = z.infer<typeof GetBoardSchema>;
export type CreateBoardType = z.infer<typeof CreateBoardSchema>;
export type UpdateBoardType = z.infer<typeof UpdateBoardSchema>;
