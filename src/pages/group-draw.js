import React from 'react';
import { useRouter } from 'next/router';
import Lottery from '../components/Lottery';
import styles from '../components/Lottery.module.css';

function GroupDraw() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/');
  };

  return (
    <div className={styles.groupDraw}>
      <h1 className={styles.title}>组    号</h1>
      <Lottery maxNumber={8} digits={1} />
      <div>
        <span className={styles.navLink} onClick={handleClick}>
          去抽选一位同学
        </span>
      </div>
    </div>
  );
}

export default GroupDraw;
