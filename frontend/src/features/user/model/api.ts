import { api } from '../../../shared/api/instance';
import type { User } from '../../../entities/user';

export const fetchUsers = async () => {
  const response = await api.get<User[]>('/api/v1/users');
  return response.data;
};

export const createUser = async (userData: Omit<User, 'id'>) => {
  const response = await api.post<User>('/api/v1/users', userData);
  return response.data;
};

export const updateUser = async ({ id, data }: { id: string; data: Partial<User> }) => {
  const response = await api.patch<User>(`/api/v1/users/${id}`, data);
  return response.data;
};

export const deleteUser = async (id: string) => {
  await api.delete(`/api/v1/users/${id}`);
  return id;
};