import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/CardSelect.module.css';
import { useState, useEffect } from 'react';

export default function CardSelect() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const numCards = 12;
    const radius = 200; // Radius of the circle
    const angleStep = (2 * Math.PI) / numCards;
    const newPositions = [];

    for (let i = 0; i < numCards; i++) {
      const angle = i * angleStep;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      newPositions.push({ x, y, angle });
    }

    setPositions(newPositions);
  }, []);

  const handleCardClick = (cardIndex) => {
    setSelectedCard(cardIndex);
  };

  const resetSelection = () => {
    setSelectedCard(null);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Card Select</title>
      </Head>
      <header className={styles.header}>
        <Link href="/" className={styles.headerLink}>JHANA</Link>
        <Link href="/about" className={styles.headerLink}>ABOUT</Link>
        <Link href="/identity" className={styles.headerLink}>ME</Link>
      </header>
      <div className={styles.main}>
        {selectedCard !== null ? (
          <div className={styles.selectedCardContainer}>
            <img src="/Card_Sample.svg" className={styles.selectedCard} />
            <div className={styles.buttons}>
              <button className={styles.button} onClick={resetSelection}>X</button>
              <button className={styles.button}>MINT</button>
            </div>
          </div>
        ) : (
          <div className={styles.cardDeck}>
            {positions.map((pos, index) => (
              <img
                key={index}
                src="/Card_Sample.svg"
                className={styles.card}
                style={{
                  transform: `translate(${pos.x}px, ${pos.y}px) rotate(${pos.angle + Math.PI / 2}rad)`,
                }}
                onClick={() => handleCardClick(index)}
              />
            ))}
            <div className={styles.centerText}>
              <p>BREATHE DEEPLY</p>
              <p>FOCUS ON YOUR INTENTION</p>
              <p>WHEN YOU'RE READY SELECT YOUR CARD(S)</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
