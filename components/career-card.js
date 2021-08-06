import { VStack, HStack, Text, Heading, Tag } from '@chakra-ui/react'
import Link from './link'

export default function CareerCard({ title, description, skills }) {
  return (
    <VStack spacing={2} align="stretch" textAlign="left">
      <Heading as="h3" size="md">
        <Link href="/adad">{title}</Link>
      </Heading>
      <Text color="whiteAlpha.600">{description}</Text>
      <HStack spacing={2}>
        {skills.map((skill) => (
          <Tag key={skill} variant="solid" bg="whiteAlpha.300">
            {skill}
          </Tag>
        ))}
      </HStack>
    </VStack>
  )
}
