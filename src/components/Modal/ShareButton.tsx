import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  VStack,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { FaShare, FaTwitter, FaFacebook, FaLink } from "react-icons/fa";

interface ShareButtonProps {
  title: string;
  text: string;
  url: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ title, text, url }) => {
  const buttonId = React.useId(); // This creates a unique ID for each instance
  console.log("ShareButton rendering", { buttonId, title, text, url });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleShare = async (
    method: "native" | "twitter" | "facebook" | "copy"
  ) => {
    switch (method) {
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            text
          )}&url=${encodeURIComponent(url)}`,
          "_blank"
        );
        break;
      case "copy":
        navigator.clipboard.writeText(url);
        toast({
          title: "Link copied to clipboard",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        break;
    }
    onClose();
  };

  return (
    <>
      <IconButton
        variant="primaryButton"
        aria-label="share reading"
        onClick={onOpen}
        icon={<FaShare />}
        flex={2}
      />
      <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
        <ModalOverlay>
          <ModalContent>
            <ModalCloseButton size="lg" />
            <ModalBody>
              <VStack spacing={4} align="stretch" py={4}>
                <Button
                  leftIcon={<FaTwitter />}
                  onClick={() => handleShare("twitter")}
                >
                  Share on Twitter
                </Button>
                <Button
                  leftIcon={<FaLink />}
                  onClick={() => handleShare("copy")}
                >
                  Copy Link
                </Button>
              </VStack>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
};

export default ShareButton;
