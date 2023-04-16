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
              Go to Individual Draw
            </span>
            </div>
        </div>
    );
}

export default GroupDraw;
