import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Lottery from '../components/Lottery';
import styles from '../components/Lottery.module.css';

function Home() {
    const [drawCounts, setDrawCounts] = useState(new Array(38).fill(0));
    const router = useRouter();

    const handleDraw = (number) => {
        setDrawCounts((prevCounts) => {
            const newCounts = [...prevCounts];
            newCounts[number - 1]++;
            return newCounts;
        });
    };

    useEffect(() => {
        const countdown = document.getElementById('countdown');
        const targetDate = new Date('2023-06-17');
        const updateCountdown = () => {
            const now = new Date();
            const diff = Math.ceil((targetDate - now) / (1000 * 60 * 60 * 24));
            countdown.textContent = `离中考还有${diff}天`;
        };

        updateCountdown();
        const timer = setInterval(updateCountdown, 1000 * 60 * 60);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div className={styles.pageContainer}>
            <h1 className={styles.title}>学号</h1>
            <Lottery maxNumber={38} digits={2} onDraw={handleDraw} />
            <div className={styles.footer}>
                <Link href="/group-draw">
                    <button className={styles.navButton}>抽取小组</button>
                </Link>
            </div>
            <div id="countdown" className={styles.countdown}></div>
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
