import { combineReducers } from '@reduxjs/toolkit';
import blogHistoryReducer from './slice/blogHistorySlice';
import examReducer from './slice/examSlice';
import imageReducer from './slice/imageSlice';
import quizExamReducer from './slice/quizExamSlice';
import quizReducer from './slice/quizSlice';
import routerRedirectReducer from './slice/routerRedirect';
// Import other slices as needed

// Combine all your slices into one root slice
const rootReducer = combineReducers({
  //   shoppingCart: shoppingCardReducer,
  // count: counterReducer,
  exams: examReducer,
  quizExam: quizExamReducer,
  quiz: quizReducer,
  image: imageReducer,
  blogHistory: blogHistoryReducer,
  routerRedirect: routerRedirectReducer
  // socialAccount: socialAccountReducer
  // Add other slices here
});

export default rootReducer;