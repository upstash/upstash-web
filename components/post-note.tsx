import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import PostNoteDefault from "../components/icons/PostNoteDefault";
import PostNoteTip from "../components/icons/PostNoteTip";
import PostNoteInfo from "../components/icons/PostNoteInfo";
import PostNoteCaution from "../components/icons/PostNoteCaution";
import PostNoteDanger from "../components/icons/PostNoteDanger";

export default function PostNote({
  children,
  tip,
  info,
  caution,
  danger,
  title
}: {
  children: React.ReactNode;
  note?: boolean;
  tip?: boolean;
  info?: boolean;
  caution?: boolean;
  danger?: boolean
  title?: string
}) {
  const bgColor = [
    tip && "green.900",
    info && "blue.900",
    caution && "orange.900",
    danger && "red.900",
  ].find((color) => color);

  const color = [
    tip && "green.100",
    info && "blue.100",
    caution && "orange.100",
    danger && "red.100",
  ].find((color) => color);

  const Icon = [
    tip && PostNoteTip,
    info && PostNoteInfo,
    caution && PostNoteCaution,
    danger && PostNoteDanger,
  ].find((color) => color);

  title ??= [
    tip && "Tip",
    info && "Info",
    caution && "Caution",
    danger && "Danger",
  ].find((color) => color);

  return (
    <Box
      p={6}
      borderRadius="md"
      bgColor={bgColor || "whiteAlpha.400"}
      color={color || "white"}
    >
      <Flex align="center" gap={1}>
        <Box as={Icon || PostNoteDefault} fontSize={22} props={undefined} />
        <Heading as="h6" fontSize="sm" textTransform="uppercase">
          {title || "Note"}
        </Heading>
      </Flex>

      <Box mt={2} lineHeight="base">
        {children}
      </Box>
    </Box>
  );
}
