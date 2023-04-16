import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Lottery from '../components/Lottery';
import styles from '../components/Lottery.module.css';

function Home() {
    // ... other code ...

    return (
        <div className={styles.pageContainer}>
            <h1 className={styles.title}>学号</h1>
            <Lottery maxNumber={38} digits={2} />
            <div>
        <span className={styles.navLink} onClick={handleClick}>
          Go to Group Draw
        </span>
            </div>
            <div className={styles.floatingText}>离中考还有 {daysUntilExam} 天</div>
        </div>
    );
}

export default Home;
