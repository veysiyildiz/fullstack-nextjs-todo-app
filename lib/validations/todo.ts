import * as z from 'zod';

export const TodoValidation = z.object({
  title: z.string().nonempty().min(3, { message: 'Minimum 3 characters.' }),
  desc: z.string(),
  author: z.string(),
  status: z.enum(['Todo', 'In Progress', 'Done']),
});
