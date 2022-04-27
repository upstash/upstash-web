import { VStack, HStack, Text, Heading, Tag } from "@chakra-ui/react";
import Link from "./link";

export default function PostCard({ title, author, tags, slug, image }) {
  console.log();
  return (
    <VStack spacing={2} align="stretch" textAlign="left">
      <Heading as="h3" size="md">
        <Link href={`/blog/${slug}`}>{title}</Link>
      </Heading>

      <Text color="whiteAlpha.600">{author.name}</Text>

      {/*<img src={image} alt={title} />*/}
    </VStack>
  );
}
