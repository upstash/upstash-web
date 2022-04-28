import {
  VStack,
  Flex,
  HStack,
  Text,
  Heading,
  Tag,
  Box,
  Avatar,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { format, parseISO } from "date-fns";

export default function PostCard({ title, author, date, slug, image }) {
  return (
    <Flex
      direction="column"
      p={6}
      h="full"
      borderRadius="md"
      bg="whiteAlpha.200"
      textAlign="left"
    >
      <Heading as="h3" size="md">
        <NextLink href={`/blog/${slug}`}>
          <a>{title}</a>
        </NextLink>
      </Heading>

      <Flex flexGrow={1} align="end" mt="24px">
        <HStack mt="auto">
          <Avatar size="md" name={author.name} src={author.image_url} />
          <Box>
            <Text color="whiteAlpha.600">{author.name}</Text>
            <time dateTime={date}>
              {format(parseISO(date), "LLLL d, yyyy")}
            </time>
          </Box>
        </HStack>
      </Flex>
    </Flex>
  );
}
