import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  Icon,
  Image,
} from "@chakra-ui/react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClick?: () => void;
}

// may export this as its own component, need to replace with new component
function Logo() {
  return <Image alt="nftarot logo" src="/Logo.svg" />;
}

export default function PrivyModal({
  onClick,
  isOpen,
  onClose,
  ...props
}: ModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered={true}
      variant={"privy"}
    >
      <ModalOverlay>
        <ModalContent style={{ width: "500px", height: "600px" }}>
          <ModalCloseButton size={"lg"} />
          <ModalHeader>
            <Logo />
            Log In Or Sign Up
          </ModalHeader>
          <ModalBody>Some content here.</ModalBody>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
}
