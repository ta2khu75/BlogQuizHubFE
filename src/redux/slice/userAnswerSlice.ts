import { QuizType } from "@/types/QuizType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface ExamAnswer {
  examId: string;
  quizId: number;
  quizType: QuizType
  answerId: number
  // answerIds: number[];
}
export interface QuizListState {
  [key: number]: number[];
}
export interface ExamListState {
  [key: string]: QuizListState;
}
// luu cac dap an cua bai thi
const initialState: ExamListState = {};
export const userAnswer = createSlice({
  name: "userAnswer",
  initialState,
  reducers: {
    // set: (
    //   state = initialState,
    //   action: PayloadAction<ExamAnswer>
    // ) => {
    //   const { examId, quizId, answerIds } = action.payload;
    //   state[examId] = state[examId] ?? {};
    //   state[examId][quizId] = answerIds;
    //   if (!answerIds.length) {
    //     delete state[examId][quizId];
    //   }
    // },
    init: (state) => {
      const examAnswerJson = localStorage.getItem("examAnswer");
      if (examAnswerJson) {
        return JSON.parse(examAnswerJson);
      }
      return state
    },
    add: (state, action: PayloadAction<ExamAnswer>) => {
      const { examId, quizId, answerId, quizType } = action.payload;
      state[examId] = state[examId] ?? {};
      if (QuizType.MULTIPLE_CHOICE === quizType) {
        state[examId][quizId] = [...(state[examId]?.[quizId] ?? []), answerId]
      } else {
        state[examId][quizId] = [answerId]
      }
    },
    remove: (state, action: PayloadAction<ExamAnswer>) => {
      const { examId, quizId, answerId, quizType } = action.payload;
      if (quizType === QuizType.SINGLE_CHOICE) {
        delete state[examId][quizId];
      } else {
        state[examId][quizId] = state[examId][quizId].filter(id => id !== answerId);
        if (state[examId][quizId].length === 0 && QuizType.MULTIPLE_CHOICE) {
          delete state[examId][quizId];
        }
      }
      if (Object.keys(state[examId]).length === 0) {
        delete state[examId]; // Xóa examId nếu không còn quiz nào
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
