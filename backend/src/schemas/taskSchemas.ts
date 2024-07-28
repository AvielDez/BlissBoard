import z from "zod";

//Request Schemas
export const CreateTaskRequestSchema = z.object({
  columnId: z.number(),
  title: z.string(),
  description: z.string(),
  status: z.string(),
  subtasks: z.array(z.string()),
});

export const UpdateTaskRequestSchema = z.object({
  columnId: z.number(),
  title: z.string().optional(),
  description: z.string().optional(),
  status: z.string(),
  subtasks: z.array(
    z.object({
      id: z.number().optional(),
      title: z.string(),
      isCompleted: z.boolean().default(false),
      toDelete: z.boolean().optional(),
    })
  ),
});

export type CreateTaskRequestType = z.infer<typeof CreateTaskRequestSchema>;

//Services Schemas
export const CreateTaskSchema = z.object({
  userId: z.string(),
  columnId: z.number(),
  title: z.string(),
  description: z.string(),
  status: z.string(),
});

export const UpdateTaskSchema = z.object({
  columnId: z.number(),
  taskId: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
  status: z.string(),
});

export type CreateTaskType = z.infer<typeof CreateTaskSchema>;
export type UpdateTaskType = z.infer<typeof UpdateTaskSchema>;
