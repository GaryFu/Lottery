// src/components/Lottery.js

import React, { useState, useEffect } from 'react';
import styles from './Lottery.module.css';

function Lottery({ maxNumber, digits, title, onNumberDrawn }) {
  const [fixedDigits, setFixedDigits] = useState(Array(digits).fill('0'));
  const [randomDigits, setRandomDigits] = useState(Array(digits).fill('0'));
  const [isRolling, setIsRolling] = useState(false);

    useEffect(() => {
        let timer;
        const maxNumberPerBall = Math.ceil(maxNumber / 10);

        if (isRolling) {
            timer = setInterval(() => {
                setRandomDigits(
                    Array(digits)
                        .fill(0)
                        .map(() => Math.floor(Math.random() * maxNumberPerBall).toString())
                );
            }, 100);
        }

        return () => {
            clearInterval(timer);
        };
    }, [isRolling, digits, maxNumber]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Enter' || e.code === 'Space') {
        e.preventDefault();
        setIsRolling(!isRolling);
        if (!isRolling) {
          const drawnNumber = Math.floor(Math.random() * maxNumber) + 1;
          const numberString = drawnNumber.toString().padStart(digits, '0');
          setFixedDigits(numberString.split(''));
          onNumberDrawn && onNumberDrawn(drawnNumber); // Call the callback function
        }
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [isRolling, maxNumber, digits]);

 useEffect(() => {
    const handleDoubleClick = (e) => {
      e.preventDefault();
      setIsRolling(!isRolling);
      if (!isRolling) {
        const drawnNumber = Math.floor(Math.random() * maxNumber) + 1;
        const numberString = drawnNumber.toString().padStart(digits, '0');
        setFixedDigits(numberString.split(''));
      }
    };
    window.addEventListener('dblclick', handleDoubleClick);
    return () => {
      window.removeEventListener('dblclick', handleDoubleClick);
    };
  }, [isRolling, maxNumber, digits]);

 useEffect(() => {
    const handleTouchStart = (e) => {
      e.preventDefault();
      setIsRolling(!isRolling);
      const currentTime = new Date().getTime();
      const timeDiff = currentTime - (lastTouch || currentTime);
      if (timeDiff < 300) {
        if (!isRolling) {
          const drawnNumber = Math.floor(Math.random() * maxNumber) + 1;
          const numberString = drawnNumber.toString().padStart(digits, '0');
          setFixedDigits(numberString.split(''));
        }
      }
      setLastTouch(currentTime);
    };
    window.addEventListener('touchstart', handleTouchStart);
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, [isRolling, maxNumber, digits]);

  const spheres = isRolling ? randomDigits : fixedDigits;

  return (
      <div className={styles.lottery}>
          <h1 className={styles.title}>{title}</h1>
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
