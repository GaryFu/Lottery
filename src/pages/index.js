import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Lottery from '../components/Lottery';
import styles from '../components/Lottery.module.css';
function Home() {
    const router = useRouter();
    const [daysUntilExam, setDaysUntilExam] = useState(0);
    const [drawCounts, setDrawCounts] = useState(Array(38).fill(0));

    useEffect(() => {
        const days = getDaysUntilExam();
        setDaysUntilExam(days);
    }, []);

    const handleClick = () => {
        router.push('/group-draw');
    };

    const getDaysUntilExam = () => {
        const currentDate = new Date();
        const examDate = new Date(2023, 5, 17); // June 17, 2023
        const timeDifference = examDate - currentDate;
        const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
        return daysDifference;
    };

    const handleDraw = (number) => {
        const newDrawCounts = [...drawCounts];
        newDrawCounts[number - 1]++;
        setDrawCounts(newDrawCounts);
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
        <div className={styles.floatingText}>离中考还有 {daysUntilExam} 天</div>
        <div className={styles.floatingTable}>
            <table>
                <tbody>
                {drawCounts.map((count, index) =>
                    count > 0 ? (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{count}</td>
                        </tr>
                    ) : null
                )}
                </tbody>
            </table>
        </div>
    </div>
  );
}

export default Home;
