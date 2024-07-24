import React, { useState, useEffect, useCallback, useRef } from "react";
import { Box, Button, Flex, useBreakpointValue, Text } from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { colors } from "@/theme/foundations/colors";

interface CardButtonProps {
  onClick: () => void;
}

// the goal is to extract this component later, but keeping everything in this file for the time being. OnClick this button is intended to trigger all of our minting logic
function CardButton({ onClick, ...props }: CardButtonProps) {
  return (
    <Box
      as="button"
      style={{
        width: "8rem",
        height: "11rem",
        backgroundColor: colors.red,
        border: "3px solid black",
        borderRadius: "2em",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={onClick}
      {...props}
    />
  );
}

//there are some weird transition-y things happening when you reach the end of the array, I haven't figured out how to give the illusion of an infinite scroll...

const CardCarousel: React.FC = () => {
  const [numItems, setNumItems] = useState(20);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  const handleCardClick = (currentIndex: number) => {
    console.log("button was clicked!");
  };

  const itemWidth =
    useBreakpointValue({ base: "80px", md: "100px", lg: "120px" }) || "100px";
  const itemHeight =
    useBreakpointValue({ base: "80px", md: "100px", lg: "120px" }) || "100px";

  const items = Array.from({ length: numItems }, (_, i) => i + 1);
  const clonedItems = [
    ...items.slice(-numItems),
    ...items,
    ...items.slice(0, numItems),
  ];

  const positionItems = useCallback(() => {
    if (!carouselRef.current) return;

    const carouselRect = carouselRef.current.getBoundingClientRect();
    const totalWidth = carouselRect.width;
    const itemWidthNum = parseInt(itemWidth);
    const visibleItems = Math.floor(totalWidth / itemWidthNum) + 8; // Increased by 4
    const arcRadius = totalWidth / 1.5; // Increased to make a wider arc
    const arcHeight = totalWidth / 8; // Adjusted for a slightly flatter arc

    clonedItems.forEach((_, index) => {
      const item = carouselRef.current!.children[index] as HTMLElement;
      if (!item) return;

      const relativeIndex =
        (index - currentIndex + clonedItems.length) % clonedItems.length;
      const totalVisibleItems = Math.min(visibleItems, numItems); // Ensure we don't show more items than we have
      const angle =
        ((relativeIndex - Math.floor(totalVisibleItems / 2)) /
          (totalVisibleItems * 1.35)) * // Reduced to 0.8 to spread items more
        Math.PI;

      const x =
        arcRadius * Math.sin(angle) + (totalWidth / 2 - itemWidthNum / 2);
      const y = -arcHeight * (Math.cos(angle) + 0.5);

      item.style.transform = `translate(${x}px, ${y}px)`;
      item.style.opacity = Math.abs(angle) > Math.PI / 1.8 ? "0" : "1"; // Adjusted to show more items
    });
  }, [currentIndex, itemWidth, numItems, clonedItems]);

  useEffect(() => {
    positionItems();
  }, [positionItems]);

  const rotateCarousel = (direction: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex + direction;

      if (newIndex < numItems || newIndex >= numItems) {
        setTimeout(() => {
          setIsTransitioning(false);
          setCurrentIndex(
            newIndex < numItems ? newIndex + numItems : newIndex - numItems
          );
        }, 0);
      } else {
        setTimeout(() => {
          setIsTransitioning(false);
        }, 300);
      }
      return newIndex;
    });
  };

  return (
    <Flex
      position="relative"
      width="100%"
      height="200px"
      justifyContent="center"
      alignItems="center"
      overflow="visible"
    >
      <Box
        ref={carouselRef}
        display="flex"
        position="relative"
        width="100%"
        height="100%"
        transition="transform 0.3s ease"
      >
        {clonedItems.map((item, index) => (
          <Box
            key={`${item}-${index}`}
            width={itemWidth}
            height={itemHeight}
            position="absolute"
            transition="all 1s ease"
            display="flex"
            justifyContent="center"
            alignItems="center"
            left={0}
            top="50%"
            transform="translate(0, -50%)"
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
