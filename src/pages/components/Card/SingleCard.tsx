import styles from "./Card.module.css";
import Image, { StaticImageData } from "next/image";

interface Props {
  className?: string;
  alt: string;
  src: string | StaticImageData;
  width?: number;
  height?: number;
  style?: any;
  onClick?: ()=> void;
}

export default function SingleCard({ alt, src, style, onClick, ...props }: Props) {
  return (
    <div style={{ zIndex: 2 }}>
      <Image
        src={src}
        alt={alt}
        className={styles.card}
        style={{
          width: "100%",
          height: "auto",
        }}
        {...props}
      />
    </div>
  );
}
