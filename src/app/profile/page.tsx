'use client'

import { Session } from 'next-auth';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './page.module.scss';

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();

  const { data: sessionData, status } = useSession();

  useEffect(() => {
    const checkSession = async () => {
      if (status === 'authenticated') {
        setSession(sessionData);
      } else if (status ==='unauthenticated'){
        setSession(null);
        router.push('/login');
      }
      setLoading(false);
    };
    
    checkSession();
  }, [router, sessionData, status]);
  return (
    <section className={styles.main}>
      <div className={styles.container}>
        <img src={session?.user?.image!} alt='profile image' />
        <p>{session?.user?.name}</p>
        <button className={styles.button} onClick={()=>signOut()}>Logout</button>
      </div>
    </section>
  )
}
