import Link from "next/link";
import LoginSignup from "../../loginSignup/LoginSignup";
import styles from './page.module.scss';
export default function Register() {
  return (
    <LoginSignup>
      <h3>Register</h3>
      <form className={styles.inputs}>
        <input type="text"  name="userName" placeholder="Username"/>
        <input type="email"  name="email" placeholder="Email"/>
        <input type="password"  name="password" placeholder="Password"/>
        <input type="password"  name="cpassword" placeholder="Confirm Password"/>
        <div className={styles.input_buttons}>
          <button type="submit">Regsiter</button>
        </div>
      </form>
      <p className={styles.register}>Already have an account yet? <Link className={styles.link} href={'/login'}>Login</Link></p>
    </LoginSignup>
  )
}