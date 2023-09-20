import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import taskReducer from '../features/task/taskSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,//handles user auth
    task: taskReducer,//handles user auth
  },
});
