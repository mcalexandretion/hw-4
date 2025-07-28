import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../shared/api/instance';
import type { User } from '../../../entities/user/model/types';

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await api.get('/api/v1/users');
  return response.data;
});

export const createUser = createAsyncThunk('users/createUser', async (userData: Omit<User, 'id'>) => {
  const response = await api.post('/api/v1/users', userData);
  return response.data;
});

export const updateUser = createAsyncThunk('users/updateUser', async ({ id, data }: { id: string; data: Partial<User> }) => {
  const response = await api.patch(`/api/v1/users/${id}`, data);
  return response.data;
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (id: string) => {
  await api.delete(`/api/v1/users/${id}`);
  return id;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      });
  },
});

export default usersSlice.reducer;