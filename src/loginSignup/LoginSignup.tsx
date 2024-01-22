import { ReactNode } from 'react';
import styles from './LoginSignup.module.scss';

interface LoginSignupProps {
  children: ReactNode;
}

export default function LoginSignup({ children }: LoginSignupProps  ) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* <h1 className={styles.head}>Dashboard</h1> */}
        {children}
      </div>
      
    </div>
  )
}