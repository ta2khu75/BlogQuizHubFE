import { apiSlice } from '@/redux/apiSlice';
import { AuthReducer } from '@/redux/slice/authSlice';
import { BlogFormReducer } from '@/redux/slice/BlogFormSlice';
import { ImageUrlsReducer } from '@/redux/slice/imageUrlsSlide';
import { QuizFormReducer } from '@/redux/slice/QuizFormSlice';
import { UserAnswerReducer } from '@/redux/slice/userAnswerSlice';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  auth: AuthReducer,
  userAnswer: UserAnswerReducer,
  imageUrls: ImageUrlsReducer,
  blogForm: BlogFormReducer,
  quizForm: QuizFormReducer,
  [apiSlice.reducerPath]: apiSlice.reducer
  // Assuming you meant to use the same reducer for quiz form
});