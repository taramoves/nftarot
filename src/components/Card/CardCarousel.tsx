import React, { useRef, useLayoutEffect, useMemo } from "react";
import { Box, Button, Flex, useBreakpointValue } from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { colors } from "@/theme/foundations/colors";

interface CardButtonProps {
  onClick: () => void;
}

// the goal is to extract this component later, but keeping everything in this file for the time being. OnClick this button is intended to trigger all of our minting logic
function CardButton({ onClick, ...props }: CardButtonProps) {
  const buttonSize = useBreakpointValue({
    base: "7rem",
    md: "8rem",
    lg: "10rem",
  });
  return (
    <Box
      as="button"
      style={{
        width: buttonSize,
        height: `calc(${buttonSize} * 1.375)`, // Maintains the aspect ratio
        backgroundColor: colors.red,
        border: "3px solid black",
        borderRadius: `calc(${buttonSize} * .15)`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transform: "rotate(0deg)", // Counter-rotate the content
        transition: "transform 0.3s ease", // Smooth transition for counter-rotation
      }}
      onClick={onClick}
      {...props}
    />
  );
}

const CardCarousel: React.FC = () => {
  const numItems =
    useBreakpointValue({ base: 6, sm: 8, md: 10, lg: 12, xl: 16 }) || 10;
  const currentIndexRef = useRef(0);
  const isTransitioningRef = useRef(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleCardClick = (index: number) => {
    console.log("button was clicked!", index);
  };

  const itemWidth =
    useBreakpointValue({ base: "80px", md: "100px", lg: "120px" }) || "100px";
  const itemHeight =
    useBreakpointValue({ base: "80px", md: "100px", lg: "120px" }) || "100px";

  const items = useMemo(
    () => Array.from({ length: numItems }, (_, i) => i + 1),
    [numItems]
  );
  const clonedItems = useMemo(
    () => [...items.slice(-numItems), ...items, ...items.slice(0, numItems)],
    [items, numItems]
  );

  const positionItems = (skipTransition = false) => {
    if (!carouselRef.current) return;

    const carouselRect = carouselRef.current.getBoundingClientRect();
    const totalWidth = carouselRect.width;
    const itemWidthNum = parseInt(itemWidth);
    const itemHeightNum = parseInt(itemHeight);
    const visibleItems = Math.min(
      numItems,
      Math.floor(totalWidth / itemWidthNum) + 4
    );
    const arcRadius = totalWidth * 0.8; // Increase radius for a flatter arch
    const centerIndex = Math.floor(visibleItems / 2);

    clonedItems.forEach((_, index) => {
      const item = carouselRef.current!.children[index] as HTMLElement;
      if (!item) return;

      const relativeIndex =
        (index - currentIndexRef.current + clonedItems.length) %
        clonedItems.length;
      const indexFromCenter = relativeIndex - centerIndex;
      const angle = (indexFromCenter / visibleItems) * Math.PI * 0.5; // Reduced angle range

      // Calculate position
      const x = arcRadius * Math.sin(angle);
      const y = arcRadius * (1 - Math.cos(angle)) - itemHeightNum / 2;

      // Calculate rotation angle
      const rotationAngle = (angle * 180) / Math.PI;

      // Apply transformations
      item.style.transition = skipTransition ? "none" : "all 0.3s ease";
      item.style.transform = `translate(${x}px, ${y}px) rotate(${rotationAngle}deg)`;
      item.style.opacity =
        Math.abs(indexFromCenter) > visibleItems / 2 ? "0" : "1";

      if (skipTransition) {
        item.offsetHeight; // Force reflow
        item.style.transition = "all 0.3s ease";
      }
    });
  };

  useLayoutEffect(() => {
    positionItems();
    window.addEventListener("resize", positionItems);
    return () => window.removeEventListener("resize", positionItems);
  }, [numItems]);

  const rotateCarousel = (direction: number) => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;

    const newIndex = currentIndexRef.current + direction;
    currentIndexRef.current = newIndex;

    positionItems();

    setTimeout(() => {
      isTransitioningRef.current = false;
      if (newIndex <= numItems || newIndex >= numItems * 2) {
        currentIndexRef.current =
          newIndex <= numItems ? newIndex + numItems : newIndex - numItems;
        positionItems(true); // Add a parameter to skip transition
      }
    }, 300); // Match this with your CSS transition duration
  };

  return (
    <Flex
      position="relative"
      width="100%"
      height="500px"
      justifyContent="center"
      alignItems="center"
      overflowX="hidden"
      overflowY="clip"
      paddingBottom="300px"
    >
      <Box ref={carouselRef} display="flex" position="relative" width="200%">
        {clonedItems.map((item, index) => (
          <Box
            key={`${item}-${index}`}
            width={itemWidth}
            height={itemHeight}
            position="absolute"
            transition="all 0.3s ease"
            display="block"
            justifyContent="center"
            alignItems="center"
            left="50%"
            top="50%"
            transform="translate(0, -50%)"
            style={{ transformOrigin: "center bottom" }}
          >
            <CardButton onClick={() => handleCardClick(index)} />
          </Box>
        ))}
      </Box>
      <Button
        position="absolute"
        left="10px"
        onClick={() => rotateCarousel(-1)}
        bg="rgba(0, 0, 0, 0.5)"
        color="white"
        _hover={{ bg: "rgba(0, 0, 0, 0.7)" }}
        zIndex={2}
      >
        <FaChevronLeft />
      </Button>
      <Button
        position="absolute"
        right="10px"
        onClick={() => rotateCarousel(1)}
        bg="rgba(0, 0, 0, 0.5)"
        color="white"
        _hover={{ bg: "rgba(0, 0, 0, 0.7)" }}
        zIndex={2}
      >
        <FaChevronRight />
      </Button>
    </Flex>
  );
};

export default CardCarousel;
