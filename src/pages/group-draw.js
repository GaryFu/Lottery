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
        <div className={styles.pageContainer}>
            <div className={styles.groupDraw}>
                <Lottery maxNumber={8} digits={1} title={"小组抽签"}/>
            </div>
            <div>
            <span className={styles.navLink} onClick={handleClick}>
              去抽学号
            </span>
            <span className={styles.floatingText}>离中考还有 {daysUntilExam} 天</span>
            </div>
        </div>
    );
}

export default GroupDraw;
