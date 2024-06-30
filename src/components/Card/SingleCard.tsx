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
  //change so it doesn't have hover state
  //get image to display to the width of parent div

  return (
    <div style={{ zIndex: 2 }}>
      <Image
        src={src}
        alt={alt}
        className={styles.card}
        boxSize={'auto'}
        style={{
          borderRadius: "2.2rem",
          border: "3px solid black",
        }}
        {...props}
      />
    </div>
  );
}
