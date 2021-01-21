import { VStack } from '@chakra-ui/react'
import CustomLink from './custom-link'

const THEME = {
  next: { bg: '#fff', color: '#000' },
  aws: { bg: '#ffe8d3', color: '#7b512d' },
  redis: { bg: '#ffdada', color: '#791514' }
}

export default function SupportCard({ theme, children, ...props }) {
  const color = THEME[theme]

  return (
    <VStack
      as={CustomLink}
      noIcon
      isExternal
      p={8}
      spacing={4}
      bg={color.bg}
      color={color.color}
      borderRadius="2xl"
      {...props}
    >
      {children}
    </VStack>
  )
}
