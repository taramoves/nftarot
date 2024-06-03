import { useRouter } from 'next/router';
import styles from '../styles/CardReveal.module.css';

const CardReveal = () => {
  const router = useRouter();
  const { image, text } = router.query;

  if (!image || !text) {
    return <div className={styles.error}>No card selected. Please go back and select a card.</div>;
  }

  return (
    <div className={styles.container}>
      <img src={image} className={styles.card} alt={text} />
      <div className={styles.descriptionBox}>
        <p>{text}</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
      <button className={styles.button} onClick={() => router.push('/card_select')}>
        Back to Card Selection
      </button>
    </div>
  );
};

export default CardReveal;
