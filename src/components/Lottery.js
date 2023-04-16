// src/components/Lottery.js

import React, { useState, useEffect } from 'react';
import styles from './Lottery.module.css';

function Lottery(props) {
    const [number, setNumber] = useState(props.initialNumber || 1);
    const [isRolling, setIsRolling] = useState(false);

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
    }, [isRolling]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Enter' || e.code === 'Space') {
        e.preventDefault();
        setIsRolling(!isRolling);
        if (!isRolling) {
          const drawnNumber = Math.floor(Math.random() * props.maxNumber) + 1;
          const numberString = drawnNumber.toString().padStart(props.digits, '0');
          setFixedDigits(numberString.split(''));
        }
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [isRolling, props.maxNumber, props.digits]);

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
