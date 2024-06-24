import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClick?: () => void;
}

export default function BeginModal({
  onClick,
  isOpen,
  onClose,
  ...props
}: ModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
      <ModalOverlay>
        <ModalContent>
          <ModalCloseButton size={"lg"} />
          <ModalBody>
            Breathe deeply.
            <br />
            Focus on your intentions.
            <br />
            {`When you’re ready, click "begin" to select your card.`}
          </ModalBody>
          <Button
            variant={"primaryButton"}
            onClick={onClick}
            style={{ width: "50%", margin: "0 auto" }}
          >
            Begin
          </Button>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
}
