// src/components/Lottery.js

import React, { useState, useEffect } from 'react';
import styles from './Lottery.module.css';

function Lottery({ maxNumber, digits }) {
  const [fixedDigits, setFixedDigits] = useState(Array(digits).fill('0'));
  const [randomDigits, setRandomDigits] = useState(Array(digits).fill('0'));
  const [isRolling, setIsRolling] = useState(false);

  useEffect(() => {
    let timer;

    if (isRolling) {
      timer = setInterval(() => {
        setRandomDigits(
          Array(digits)
            .fill(0)
            .map(() => Math.floor(Math.random() * 10).toString())
        );
      }, 100);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isRolling, digits]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        setIsRolling(!isRolling);
        if (!isRolling) {
          const drawnNumber = Math.floor(Math.random() * maxNumber) + 1;
          const numberString = drawnNumber.toString().padStart(digits, '0');
          setFixedDigits(numberString.split(''));
        }
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [isRolling, maxNumber, digits]);
  const spheres = isRolling ? randomDigits : fixedDigits;

  return (
    <div className={styles.lottery}>
      <div className={styles.sphereContainer}>
        {spheres.map((digit, index) => (
          <div key={index} className={styles.ball}>
            {digit}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Lottery;
