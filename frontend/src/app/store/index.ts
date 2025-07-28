import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import usersReducer from './slices/usersSlice';
import { checkAuth, login, logout } from './slices/authSlice';
import { fetchUsers, createUser, updateUser, deleteUser } from './slices/usersSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { checkAuth, login, logout, fetchUsers, createUser, updateUser, deleteUser };