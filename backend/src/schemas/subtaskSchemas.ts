import z from "zod";

//Services Schemas
export const UpdateSubtaskSchema = z.object({
  title: z.string().optional(),
  isCompleted: z.boolean(),
  subtaskId: z.number(),
});

export const CreateSubtaskSchema = z.object({
  title: z.string(),
  isCompleted: z.boolean().default(false),
  userId: z.string(),
  taskId: z.string(),
});

export type UpdateSubtaskType = z.infer<typeof UpdateSubtaskSchema>;
export type CreateSubtaskType = z.infer<typeof CreateSubtaskSchema>;
