import { answerDtoSchema } from "@/types/dto/AnswerDto";
import { QuestionType } from "@/types/QuestionType";
import { z } from "zod";

export const questionSchema = z.object({
    id: z.number().int().positive().optional(),
    content: z.string().nonempty().min(1).max(255),
    shuffle_answer: z.boolean(),
    type: z.nativeEnum(QuestionType),
    answers: z.array(answerDtoSchema).refine((answers) => answers.some((answer) => answer.correct), { message: 'At least one answer must be correct' }),
})

// .refine(data => {
//     console.log("Answers in refine:", data.answers);
//     data.answers.some(answer => answer.correct)
// }
//     , { message: "At least one answer must be correct", path: ["answers"] })
export type QuestionDto = z.infer<typeof questionSchema>