import { VStack, HStack, Text, Heading, Tag, Flex } from "@chakra-ui/react";
import Link from "./link";

export default function CareerCard({ title, summary, skills, slug }) {
  return (
    <VStack spacing={2} align="stretch" textAlign="left">
      <Heading as="h3" size="md">
        <Link href={`/careers/${slug}`}>{title}</Link>
      </Heading>

      <Text color="whiteAlpha.600">{summary}</Text>

      <Flex flexWrap="wrap" gap={2}>
        {skills.map((skill) => (
          <Tag key={skill} variant="solid" bg="whiteAlpha.300">
            {skill}
          </Tag>
        ))}
      </Flex>
    </VStack>
  );
}
