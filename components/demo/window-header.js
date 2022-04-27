import { Box, HStack, Flex } from "@chakra-ui/react";

function WindowHeader({ children }) {
  function Dot() {
    return (
      <Box as="span" w="9px" h="9px" borderRadius="full" bg="whiteAlpha.300" />
    );
  }

  return (
    <Flex pos="relative" align="center" height="40px" bg="whiteAlpha.200">
      <HStack spacing={1} ml={4}>
        <Dot />
        <Dot />
        <Dot />
      </HStack>
      {children}
    </Flex>
  );
}

export default WindowHeader;
