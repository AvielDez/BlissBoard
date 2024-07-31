import z from "zod";

//Request Schema

export const UpdateSubtaskRequestSchema = z.object({
  isCompleted: z.boolean(),
  subtaskId: z.number(),
});
export type UpdateSubtaskRequestType = z.infer<typeof UpdateSubtaskRequestSchema>;

//Services Schemas

export const UpdateSubtaskSchema = z.object({
  title: z.string().optional(),
  isCompleted: z.boolean(),
  subtaskId: z.number(),
});

export const UpdateSubtaskCompletedSchema = z.object({
  isCompleted: z.boolean(),
  subtaskId: z.string(),
});

export const CreateSubtaskSchema = z.object({
  title: z.string(),
  isCompleted: z.boolean().default(false),
  userId: z.string(),
  taskId: z.string(),
});

export type CreateSubtaskType = z.infer<typeof CreateSubtaskSchema>;
export type UpdateSubtaskType = z.infer<typeof UpdateSubtaskSchema>;
export type UpdateSubtaskCompletedType = z.infer<typeof UpdateSubtaskCompletedSchema>;
