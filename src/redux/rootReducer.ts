import { AuthReducer } from '@/redux/slice/authSlide';
import { ExamReducer } from '@/redux/slice/examSlice';
import { QuizReducer } from '@/redux/slice/quizSlice';
import { UserAnswerReducer } from '@/redux/slice/userAnswerSlice';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  auth: AuthReducer,
  userAnswer: UserAnswerReducer,
  exam: ExamReducer,
  quiz: QuizReducer
});
// export const makeStore = () => {
//   return store
// }

// // Infer the type of makeStore
// export type AppStore = ReturnType<typeof makeStore>
// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch