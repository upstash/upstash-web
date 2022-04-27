import { Box } from "@chakra-ui/react";
import * as Icon from "../icons";

export default function ColCheck({ check = false }) {
  return check ? (
    <Box as={Icon.Check} color="green.400" fontSize="2xl" />
  ) : (
    <Box as={Icon.Minus} color="whiteAlpha.500" fontSize="2xl" />
  );
}
