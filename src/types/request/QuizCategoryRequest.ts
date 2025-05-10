import { z } from "zod";

export const quizCategorySchema = z.object({
    name: z.string().min(3)
})
export type QuizCategoryRequest = z.infer<typeof quizCategorySchema>