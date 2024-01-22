'use client'

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from "next/link";
import { useState } from 'react';
import { FaTools } from "react-icons/fa";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { GiPayMoney } from "react-icons/gi";
import { GoHomeFill } from "react-icons/go";
import { IoSettings } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import notification from '../assets/notification.png';
import settingLogo from '../assets/settings.png';
import styles from './Controls.module.scss';

export default function Controls() {
  const { data: session} = useSession();
  const [active, setActive] = useState('/');
  const [page, setPage]=useState('Overview');


  return (
    <section className={styles.main}>
      <div className={styles.top}>

        <div className={styles.name}>
          <h1>Dashboard</h1>
          <h2>{page}</h2>
        </div>

        <div className={styles.user}>
          <div className={styles.controls}>
            <div className={styles.setting}>
              <Image src={settingLogo} alt='setting' />
            </div>
            <div className={styles.setting}>
              <Image src={notification} alt='notification' />
            </div>
          </div>
          <div className={styles.profile}>
            <Link href={'/profile'}><img src={session?.user?.image} /></Link>
            <Link href={'/profile'}><p>{session?.user?.name}</p></Link>
          </div>
        </div>
      </div>

      <div className={styles.left}>
        <ul>
          <Link href={'/'}><li onClick={()=>{setActive('/'); setPage('Overview')}} className={active==='/' && styles.active}><GoHomeFill className={styles.logo} /><p>Dashboard</p></li></Link>

          <Link href={'/transaction'}><li onClick={()=>{setActive('/transaction'); setPage('Transactions')}} className={active==='/transaction' && styles.active}><FaMoneyBillTrendUp className={styles.logo} /><p>Transactions</p></li></Link>

          <Link href={'/accounts'}><li onClick={()=>{setActive('/users'); setPage('Users')}} className={active==='/users' && styles.active}><MdAccountCircle className={styles.logo} /><p>Users</p></li></Link>

          <Link href={'/trade'}><li onClick={()=>{setActive('/trade'); setPage('Trade')}} className={active==='/trade' && styles.active}><GiPayMoney className={styles.logo} /><p>Trade</p></li></Link>

          {/* <Link href={'/creditCard'}><li onClick={()=>{setActive('/creditCard'); setPage('Credit Cards')}} className={active==='/creditCard' && styles.active}><FaCreditCard className={styles.logo} /><p>Credit Cards</p></li></Link>

          <Link href={'/loans'}><li onClick={()=>{setActive('/loans'); setPage('Loans')}} className={active==='/loans' && styles.active}><GiReceiveMoney className={styles.logo} /><p>Loans</p></li></Link> */}

          <Link href={'/services'}><li onClick={()=>{setActive('/services'), setPage('Services')}} className={active==='/services' && styles.active}><FaTools className={styles.logo} /><p>Services</p></li></Link>

          {/* <Link href={'/privilege'}><li onClick={()=>{setActive('/privilege'); setPage('My Privileges')}} className={active==='/privilege' && styles.active}><FaLightbulb className={styles.logo} /><p>My Privileges</p></li></Link> */}

          <Link href={'/settings'}><li onClick={()=>{setActive('/settings'); setPage('Settings')}} className={active==='/settings' && styles.active}><IoSettings className={styles.logo} /><p>Settings</p></li></Link>
        </ul>
      </div>

    </section>
  )
}
