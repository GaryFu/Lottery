import React from 'react';
import { useRouter } from 'next/router';
import Lottery from '../components/Lottery';
import styles from '../components/Lottery.module.css';

function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/group-draw');
  };

  return (
    <div>
      <h1 className={styles.title}>学    号</h1>
      <Lottery maxNumber={38} digits={2} />
      <div>
        <span className={styles.navLink} onClick={handleClick}>
          去抽一个小组
        </span>
      </div>
    </div>
  );
}

export default Home;
