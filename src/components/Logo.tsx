import { Image } from "@chakra-ui/react";

export default function Logo(...props: any) {
  return <Image {...props} boxSize={'45px'} alt="nftarot logo" src="/Logo.svg" />;
}
