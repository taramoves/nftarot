import { Image, Flex } from "@chakra-ui/react";
import { colors } from "@/theme/foundations/colors";

interface Props {
  className?: string;
  alt: string;
  src: string;
  width?: number;
  height?: number;
  pastReading?: boolean;
  style?: any;
  onClick?: () => void;
}

export default function SingleCard({
  alt,
  src,
  style,
  onClick,
  pastReading = false,
  ...props
}: Props) {
  return pastReading === true ? (
    <Flex
      style={{
        backgroundColor: colors.yellow,
        borderRadius: "2.2rem",
        border: "3px solid black",
        alignItems: "center",
        justifyContent: "center",
      }}
      width={['8rem',"12rem"]}
    >
      <Image
        src={src}
        alt={alt}
        style={{
          borderRadius: "1.2rem",
          border: "3px solid black",
          width: "80%",
          margin: '1rem'
        }}
      />
    </Flex>
  ) : (
    <div style={{ zIndex: 2 }}>
      <Image
        src={src}
        alt={alt}
        style={{
          borderRadius: "2.2rem",
          border: "3px solid black",
        }}
        {...props}
      />
    </div>
  );
}
