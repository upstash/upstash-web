import { VStack } from "@chakra-ui/react";
import CustomLink from "./custom-link";

export default function SupportCard({
  bgColor,
  textColor,
  children,
  ...props
}) {
  return (
    <VStack
      as={CustomLink}
      noIcon
      isExternal
      p={8}
      spacing={4}
      bg={bgColor}
      color={textColor}
      borderRadius="2xl"
      _hover={{
        color: textColor,
        textDecoration: "none",
        transform: "scale(1.02)",
      }}
      {...props}
    >
      {children}
    </VStack>
  );
}
