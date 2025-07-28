export interface AuthState {
  user: { email: string } | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}