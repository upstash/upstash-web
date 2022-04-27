import { VStack, HStack, Text, Heading, Tag } from "@chakra-ui/react";
import Link from "./link";
import { format, parseISO } from "date-fns";

export default function PostCard({ title, author, date, slug, image }) {
  console.log();
  return (
    <VStack spacing={2} align="stretch" textAlign="left">
      <Heading as="h3" size="md">
        <Link href={`/blog/${slug}`}>{title}</Link>
      </Heading>

      <Text color="whiteAlpha.600">{author.name}</Text>

      <time dateTime={date} className="block text-sm text-slate-600">
        {format(parseISO(date), "LLLL d, yyyy")}
      </time>

      {/*<img src={image} alt={title} />*/}
    </VStack>
  );
}
