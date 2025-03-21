import { AuthReducer } from '@/redux/slice/authSlide';
import { UserAnswerReducer } from '@/redux/slice/userAnswerSlice';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  auth: AuthReducer,
  userAnswer: UserAnswerReducer
});
// export const makeStore = () => {
//   return store
// }

// // Infer the type of makeStore
// export type AppStore = ReturnType<typeof makeStore>
// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch