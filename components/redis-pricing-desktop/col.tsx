import { Flex, FlexProps } from "@chakra-ui/react";
import React from "react";

export default function Col({
  children,
  highlight = false,
  ...props
}: FlexProps & {
  children?: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <Flex
      p={4}
      align="center"
      justify="center"
      bg={highlight && "whiteAlpha.200"}
      {...props}
    >
      {children}
    </Flex>
  );
}
