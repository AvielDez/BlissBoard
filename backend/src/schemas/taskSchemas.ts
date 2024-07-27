import z from "zod";

export const CreateTaskSchema = z.object({
  userId: z.number(),
  columnId: z.number(),
  title: z.string(),
  description: z.string(),
  status: z.string(),
  subtasks: z.array(
    z.object({
      name: z.string(),
    })
  ),
});

export const UpdateTaskSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  updatedAt: z.date(),
  subtasks: z.array(
    z.object({
      name: z.string(),
      toDelete: z.boolean(),
    })
  ),
});

export type CreateTaskType = z.infer<typeof CreateTaskSchema>;
