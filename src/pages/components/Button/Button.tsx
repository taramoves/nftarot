import styles from './Button.module.css';

interface Props {
  text?: string;
  className?: string;
  style?: object;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void; 
}

export default function Button({ text, onClick, ...props }: Props) {

  return (
    <button type="button" onClick={onClick} {...props} className={styles.button}>
      {text}
    </button>
  );
}
