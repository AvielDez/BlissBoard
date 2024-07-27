import z from "zod";

//Request Schemas

export const CreateColumnSchema = z.object({
  userId: z.number(),
  boardId: z.number(),
  name: z.string(),
});

export const UpdateColumnNameSchema = z.object({
  columnId: z.number(),
  name: z.string(),
});

export type CreateColumnType = z.infer<typeof CreateColumnSchema>;
export type UpdateColumnNameType = z.infer<typeof UpdateColumnNameSchema>;

//Services Schemas
export const CreateManyColumnsSchema = z.object({
  userId: z.number(),
  boardId: z.number(),
  name: z.string(),
});
