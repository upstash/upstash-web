import { VStack, HStack, Text, Heading, Tag, Box } from "@chakra-ui/react";
import Link from "./link";
import { format, parseISO } from "date-fns";

export default function PostCard({ title, author, date, slug, image }) {
  return (
    <Box borderRadius={2} bg="whiteAlpha.200" p={6}>
      <VStack spacing={2} align="stretch" textAlign="left">
        <Heading as="h3" size="md">
          <Link href={`/blog/${slug}`}>{title}</Link>
        </Heading>

        <Text color="whiteAlpha.600">{author.name}</Text>
        <Text color="whiteAlpha.600">{author.title}</Text>
        <img width={50} src={author.image_url} alt={author.name} />

        <time dateTime={date} className="block text-sm text-slate-600">
          {format(parseISO(date), "LLLL d, yyyy")}
        </time>

        {/*<img src={image} alt={title} />*/}
      </VStack>
    </Box>
  );
}
