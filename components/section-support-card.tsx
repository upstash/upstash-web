import { VStack, StackProps, LinkProps } from "@chakra-ui/react";
import CustomLink from "./custom-link";
import React from "react";

export default function SupportCard({
  bgColor,
  textColor,
  children,
  ...props
}: StackProps &
  LinkProps & {
    bgColor?: string;
    textColor?: string;
    children: React.ReactNode;
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
