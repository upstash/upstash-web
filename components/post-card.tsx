import {
  Flex,
  HStack,
  Text,
  Heading,
  Box,
  Avatar,
  Link,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { format, parseISO } from "date-fns";

export default function PostCard({ title, authorObj, date, slug }) {
  return (
    <Flex
      direction="column"
      p={6}
      h="full"
      borderRadius="md"
      bg="whiteAlpha.100"
      textAlign="left"
    >
      <Heading
        as="h3"
        size="lg"
        fontWeight="semibold"
        lineHeight="shorter"
        letterSpacing="tight"
        className="post-card-title"
      >
        <NextLink href={`/blog/${slug}`} passHref>
          <Box as="a" display="block">
            {title}
          </Box>
        </NextLink>
      </Heading>

      <Flex flexGrow={1} align="end" mt="32px">
        <HStack mt="auto">
          <Avatar size="md" name={authorObj.name} src={authorObj.image_url} />
          <Box>
            <NextLink href={`/blog/author/${authorObj.slug}`}>
              <a>
                <Text>{authorObj.name}</Text>
              </a>
            </NextLink>

            <Text as="time" dateTime={date} color="whiteAlpha.600">
              {format(parseISO(date), "LLLL d, yyyy")}
            </Text>
          </Box>
        </HStack>
      </Flex>
    </Flex>
  );
}
