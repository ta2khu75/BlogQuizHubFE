import { AccessModifier } from "@/types/AccessModifier";
import { QuizResultMode } from "@/types/DisplayMode";
import { QuizLevel } from "@/types/QuizLevel";
import { z } from "zod";

export const quizBaseSchema = z.object({
    title: z.string().min(3).nonempty(),
    duration: z.number().min(5).max(60),
    description: z.string().min(10).max(500),
    shuffle_question: z.boolean(),
    completed: z.boolean(),
    level: z.nativeEnum(QuizLevel),
    quiz_result_mode: z.nativeEnum(QuizResultMode),
    access_modifier: z.nativeEnum(AccessModifier),
})
export type QuizBase = z.infer<typeof quizBaseSchema>;