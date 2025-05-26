import { AuthReducer } from '@/redux/slice/authSlice';
import { BlogFormReducer } from '@/redux/slice/BlogFormSlice';
import { ImageUrlsReducer } from '@/redux/slice/imageUrlsSlide';
import { UserAnswerReducer } from '@/redux/slice/userAnswerSlice';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  auth: AuthReducer,
  userAnswer: UserAnswerReducer,
  imageUrls: ImageUrlsReducer,
  blogForm: BlogFormReducer,
});