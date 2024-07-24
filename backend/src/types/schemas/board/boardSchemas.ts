import z from "zod";

export const CreateBoardSchema = z.object({
  name: z.string(),
  columnNames: z.array(z.string()),
});

export const UpdateBoardSchema = z.object({
  name: z.string().optional(),
  columns: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      toDelete: z.boolean(),
    })
  ),
});

export type UpdateBoardsType = z.infer<typeof UpdateBoardSchema>;
export type CreateBoardType = z.infer<typeof CreateBoardSchema>;
