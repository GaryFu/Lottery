import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Lottery from '../components/Lottery';
import styles from '../components/Lottery.module.css';

function Home() {
    const router = useRouter();
    const [daysUntilExam, setDaysUntilExam] = useState(0);

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

    const [drawnNumbers, setDrawnNumbers] = useState(Array(48).fill(0));

    const handleNumberDrawn = (number) => {
        const newDrawnNumbers = [...drawnNumbers];
        newDrawnNumbers[number - 1]++;
        setDrawnNumbers(newDrawnNumbers);
    };
  return (
    <div className={styles.pageContainer}>
       <Lottery maxNumber={43} digits={2} onNumberDrawn={handleNumberDrawn}  title={"学    号"} />

        <div>
        <span className={styles.navLink} onClick={handleClick}>
          去抽一个小组
        </span>
      </div>
      //<div className={styles.floatingText}>离中考还有 {daysUntilExam} 天</div>
      <div className={styles.floatingText}>祝亲爱的老师们节日快乐！</div>
        <table className={styles.resultsTable}>
            <thead>
            <tr>
                <th>学号</th>
                <th>次数</th>
            </tr>
            </thead>
            <tbody>
            {drawnNumbers.map((count, index) => {
                if (count > 0) {
                    return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{count}</td>
                        </tr>
                    );
                }
            })}
            </tbody>
        </table>
    </div>
  );
}

export default Home;
