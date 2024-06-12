import styles from "./Card.module.css";
import Image from "next/image";

interface Props {
  className?: string;
  alt: string;
  src: string;
}

export default function Card({ alt, src, ...props }: Props) {
  return <Image src={src} alt={alt} className={styles.card} {...props} />;
}
