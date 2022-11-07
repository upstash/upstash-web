import { Box, Tooltip, Text } from "@chakra-ui/react";
import * as Icon from "../icons";

export default function CustomTooltip({ children }) {
  if (!children) return null;

  return (
    <Tooltip
      shouldWrapChildren
      placement="top"
      label={
        <Text color="gray.900" p={2}>
          {children}
        </Text>
      }
    >
      <Box
        as={Icon.Info}
        ml={1}
        fontSize="xl"
        opacity={0.6}
        display="inline-flex"
      />
    </Tooltip>
  );
}
