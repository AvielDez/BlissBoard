import z from "zod";

//Request Schemas

//Services Schemas
export const CreateColumnSchema = z.object({
  userId: z.string(),
  boardId: z.string(),
  name: z.string(),
});

export const UpdateColumnNameSchema = z.object({
  columnId: z.string(),
  name: z.string(),
});

export const CreateManyColumnsSchema = z.object({
  userId: z.string(),
  boardId: z.string(),
  columnNames: z.array(z.string()),
});

export type CreateColumnType = z.infer<typeof CreateColumnSchema>;
export type UpdateColumnNameType = z.infer<typeof UpdateColumnNameSchema>;
export type CreateManyColumnsType = z.infer<typeof CreateManyColumnsSchema>;
