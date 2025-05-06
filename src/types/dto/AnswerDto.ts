import { z } from "zod";

export const answerDtoSchema = z.object({
    id: z.number().int().positive().optional(),
    content: z.string().nonempty().min(1).max(500),
    correct: z.boolean().optional(),
})
export type AnswerDto = z.infer<typeof answerDtoSchema>;