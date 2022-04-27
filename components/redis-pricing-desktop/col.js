import { Flex } from "@chakra-ui/react";

export default function Col({ children, highlight = false, ...props }) {
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
