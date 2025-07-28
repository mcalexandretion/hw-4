import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, checkAuth, logout } from '../../../app/store';
import type { AppDispatch } from '../../../app/store';
import type { RootState } from '../../../app/store';
import { Input, Button } from '../../../shared/ui';
import styles from './Login.module.css';

export interface LoginForm {
  email: string;
  password: string;
}

export function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const authError = useSelector((state: RootState) => state.auth.error);

  const onSubmit = async (data: LoginForm) => {
    const result = await dispatch(login(data));
    if (login.fulfilled.match(result)) {
      await dispatch(checkAuth());
      navigate('/');
    }
  };

  const handleLogout = async () => {
    const result = await dispatch(logout());
    if (logout.fulfilled.match(result)) {
      navigate('/login');
    }
  };

  return (
    <div className={styles.container}>
      <h2>{isAuthenticated ? 'Logged In' : 'Login'}</h2>
      {authError && <div className={styles.error}>{authError}</div>}
      {isAuthenticated ? (
        <Button onClick={handleLogout}>Log out</Button>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Input
            label="Email"
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
            })}
            error={errors.email?.message}
          />
          <Input
            label="Password"
            type="password"
            {...register('password', { required: 'Password is required' })}
            error={errors.password?.message}
          />
          <Button type="submit">Log in</Button>
        </form>
      )}
    </div>
  );
}
