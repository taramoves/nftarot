import styles from "../../styles/CardSelect.module.css";
import { StaticImageData } from "next/image";
import { Image } from "@chakra-ui/react";

interface Props {
  className?: string;
  alt: string;
  src: string;
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
  console.log("SingleCard src:", src); // Add this line
  return (
    <div style={{ zIndex: 2 }}>
      <Image
        src={src}
        alt={alt}
        className={styles.card}
        style={{
          borderRadius: "2.2rem",
          border: "3px solid black",
        }}
        {...props}
      />
    </div>
  );
}
