import * as Icon from './icons'
import { Link, Flex, Box } from '@chakra-ui/react'

function CustomLink({ isExternal, children, noIcon = false, ...props }) {
  return (
    <Flex
      as={Link}
      isExternal
      d="inline-flex"
      align="center"
      color="purple.300"
      _hover={{
        color: 'purple.400'
      }}
      {...props}
    >
      {children}
      {isExternal && !noIcon && (
        <Box as={Icon.ArrowUpRight} ml="2px" fontSize="22px" opacity={0.5} />
      )}
    </Flex>
  )
}

export default CustomLink
