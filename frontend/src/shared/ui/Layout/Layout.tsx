import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Navigation } from '../Navigation/Navigation';
import styles from './Layout.module.css';

export function Layout() {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.main}>
        <Navigation />
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}