// frontend/src/app/App.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { checkAuth } from './store';
import type { RootState, AppDispatch } from './store';
import  { Layout } from '../shared/ui/Layout/Layout';
import { HomePage, UserCreatePage, UserEditPage, LoginPage } from '../pages';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const isAuthChecked = useSelector((state: RootState) => state.auth.isAuthChecked);
  const authError = useSelector((state: RootState) => state.auth.error);

  useEffect(() => {
    if (!isAuthChecked) {
      console.log('Dispatching checkAuth...');
      dispatch(checkAuth()).catch((error) => {
        console.error('Check auth failed:', error);
      });
    }
  }, [dispatch, isAuthChecked]);

  if (!isAuthChecked) {
    return <div>Loading...</div>;
  }

  if (authError) {
    console.log('Auth error:', authError);
  }

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />} />
      <Route element={<Layout />}>
        <Route path="/" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" replace />} />
        <Route path="/user/create" element={isAuthenticated ? <UserCreatePage /> : <Navigate to="/login" replace />} />
        <Route path="/user/edit/:id" element={isAuthenticated ? <UserEditPage /> : <Navigate to="/login" replace />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Route>
    </Routes>
  );
}

export default App;