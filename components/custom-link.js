import * as Icon from './icons'
import { Link, Flex, Box } from '@chakra-ui/react'

function CustomLink({ isExternal, children, ...props }) {
  return (
    <Flex
      as={Link}
      align="center"
      _hover={{ color: 'brand' }}
      isExternal
      {...props}
    >
      {children}
      {isExternal && (
        <Box as={Icon.ArrowUpRight} fontSize="22px" opacity={0.5} />
      )}
    </Flex>
  )
}

export default CustomLink
