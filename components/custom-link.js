import * as Icon from './icons'
import { Link, Flex, Box } from '@chakra-ui/react'

function CustomLink({ isExternal, children, noIcon = false, ...props }) {
  return (
    <Flex
      as={Link}
      isExternal
      d="inline-flex"
      align="center"
      _hover={{
        color: 'primary'
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
