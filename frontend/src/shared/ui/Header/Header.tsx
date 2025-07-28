import { useDispatch } from 'react-redux';
import { logout } from '../../../features/auth';
import styles from './Header.module.css';
import { Button } from '../Button/Button';

export function Header() {
  const dispatch = useDispatch();

  return (
    <header className={styles.header}>
      <h1>Login app</h1>
      <Button onClick={() => dispatch(logout())}>Log out</Button>
    </header>
  );
}