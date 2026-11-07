import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authReducer from './slices/authSlice';
import teamReducer from './slices/teamSlice';
import contentReducer from './slices/contentSlice';
import waitlistReducer from './slices/waitlistSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    team: teamReducer,
    content: contentReducer,
    waitlist: waitlistReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Type-safe hooks
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
