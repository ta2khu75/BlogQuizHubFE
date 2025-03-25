import { QuestionType } from "@/types/QuestionType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface QuizAnswer {
  quizId: string;
  questionId: number;
  questionType: QuestionType
  answerId: number
  // answerIds: number[];
}
export interface QuestionListState {
  [key: number]: number[];
}
export interface QuizListState {
  [key: string]: QuestionListState;
}
// luu cac dap an cua bai thi
const initialState: QuizListState = {};
export const userAnswer = createSlice({
  name: "userAnswer",
  initialState,
  reducers: {
    // set: (
    //   state = initialState,
    //   action: PayloadAction<ExamAnswer>
    // ) => {
    //   const { quizId, questionId, answerIds } = action.payload;
    //   state[quizId] = state[quizId] ?? {};
    //   state[quizId][questionId] = answerIds;
    //   if (!answerIds.length) {
    //     delete state[quizId][questionId];
    //   }
    // },
    init: (state) => {
      const examAnswerJson = localStorage.getItem("examAnswer");
      if (examAnswerJson) {
        return JSON.parse(examAnswerJson);
      }
      return state
    },
    add: (state, action: PayloadAction<QuizAnswer>) => {
      const { quizId, questionId, answerId, questionType } = action.payload;
      state[quizId] = state[quizId] ?? {};
      if (QuestionType.MULTIPLE_CHOICE === questionType) {
        state[quizId][questionId] = [...(state[quizId]?.[questionId] ?? []), answerId]
      } else {
        state[quizId][questionId] = [answerId]
      }
    },
    remove: (state, action: PayloadAction<QuizAnswer>) => {
      const { quizId, questionId, answerId, questionType } = action.payload;
      if (questionType === QuestionType.SINGLE_CHOICE) {
        delete state[quizId][questionId];
      } else {
        state[quizId][questionId] = state[quizId][questionId].filter(id => id !== answerId);
        if (state[quizId][questionId].length === 0 && QuestionType.MULTIPLE_CHOICE) {
          delete state[quizId][questionId];
        }
      }
      if (Object.keys(state[quizId]).length === 0) {
        delete state[quizId]; // Xóa quizId nếu không còn quiz nào
      }
    },
    delete: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
    reset: () => {
      return initialState;
    },
  },
});
export const UserAnswerActions = userAnswer.actions;
export const UserAnswerReducer = userAnswer.reducer;
