import z from "zod";

export const CreateTaskSchema = z.object({
  title: z.string(),
  description: z.string(),
  subtasks: z.array(z.object({})),
});

export type CreateTaskType = z.infer<typeof CreateTaskSchema>;
