import { quizBaseSchema } from "@/types/base/QuizBase";
import { questionSchema } from "@/types/dto/QuestionDto";
import { z } from "zod";

export const quizSchema = quizBaseSchema.extend({
    blog_id: z.string().optional(),
    category_id: z.number().int().positive(),
    questions: z.array(questionSchema)
})
export type QuizRequest = z.infer<typeof quizSchema>