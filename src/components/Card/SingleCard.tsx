import styles from "../../styles/CardSelect.module.css";
import Image, { StaticImageData } from "next/image";

interface Props {
  className?: string;
  alt: string;
  src: string | StaticImageData;
  width?: number;
  height?: number;
  style?: any;
  onClick?: () => void;
}

export default function SingleCard({
  alt,
  src,
  style,
  onClick,
  ...props
}: Props) {
  console.log('SingleCard src:', src);  // Add this line
  return (
    <div style={{ zIndex: 2 }}>
      <Image
        src={src}
        alt={alt}
        className={styles.card}
        style={{
          width: "100%",
          height: "auto",
          borderRadius: "2.2rem",
          border: "3px solid black",
        }}
        {...props}
      />
    </div>
  );
}
