'use client'

import { Session } from 'next-auth';
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import LoginSignup from "../../loginSignup/LoginSignup";
import styles from './page.module.scss';


async function handleGoogleSignin(){
  await signIn('google',{callbackUrl:"http://localhost:3000"});
}

export default function Login() {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();

  const { data: sessionData, status } = useSession();

  useEffect(() => {
    const checkSession = async () => {
      if (status === 'unauthenticated') {
        setSession(sessionData);
        router.push('/login');
      } else if (status ==='authenticated'){
        setSession(null);
        router.push('/');
      }

      setLoading(false);
    };

    checkSession();
  }, [router, sessionData, status]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <LoginSignup>
      {<LoginPage />}
    </LoginSignup>
  );
};



const LoginPage=()=>{
  return(
    <>
      <h3>Login</h3>
      <form className={styles.inputs}>
        <input type="email"  name="email" placeholder="Email"/>
        <input type="password"  name="password" placeholder="Password"/>
        <div className={styles.input_buttons}>
          <button type="submit">Login</button>
        </div>
        <div className={styles.auth_buttons}>
          <button type="button" className={styles.google_login_button} onClick={handleGoogleSignin}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/archive/c/c1/20230822192910%21Google_%22G%22_logo.svg" alt="Google Icon"  />
            Login with Google
          </button>
          <button type="button" className={styles.github_login_button}>
            <img src="https://i.pinimg.com/564x/b5/1b/78/b51b78ecc9e5711274931774e433b5e6.jpg" alt="Google Icon" />
            Login with Github
          </button>
        </div>
      </form>
      <p className={styles.register}>Don't have an account yet? <Link className={styles.link} href={'/register'}>Register</Link></p>
    </>
  )
}