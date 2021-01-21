import * as Icon from './icons'
import { Link, Flex, Box } from '@chakra-ui/react'

function CustomLink({ isExternal, children, noIcon = false, ...props }) {
  return (
    <Flex d="inline-flex" as={Link} align="center" isExternal {...props}>
      {children}
      {isExternal && !noIcon && (
        <Box as={Icon.ArrowUpRight} fontSize="22px" opacity={0.5} />
      )}
    </Flex>
  )
}

export default CustomLink
