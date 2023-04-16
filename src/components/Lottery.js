import React, { useState, useEffect } from 'react';
import styles from './Lottery.module.css';

function Lottery(props) {
    const [number, setNumber] = useState(props.initialNumber || 1);
    const [rolling, setRolling] = useState(false);

    useEffect(() => {
        if (rolling) {
            const timer = setInterval(() => {
                setNumber((prevNumber) => Math.floor(Math.random() * props.maxNumber) + 1);
            }, 100);
            return () => clearInterval(timer);
        } else {
            if (props.onDraw) {
                props.onDraw(number);
            }
        }
    }, [rolling]);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            setRolling(!rolling);
        }
    };

    const formattedNumber = number.toString().padStart(props.digits, '0');

    return (
        <div className={styles.container}>
            <div
                className={styles.ball}
                tabIndex="0"
                onKeyPress={handleKeyPress}
                style={{
                    background: `radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, ${rolling ? '#87ceeb' : '#222'} 45%, #12537e 100%)`,
                }}
            >
                {formattedNumber}
            </div>
        </div>
    );
}

export default Lottery;
