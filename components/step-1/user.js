import { Text, IconButton, Flex, Avatar } from '@chakra-ui/react'

import * as Icon from '../icons'

function User({ logout, name, picture }) {
  return (
    <Flex
      align="center"
      mx="auto"
      p={2}
      bg="white"
      color="black"
      borderRadius="full"
    >
      <Avatar src={picture} name={name} size="sm" />
      <Text ml="3">{name}</Text>
      <IconButton
        isRound
        ml={1}
        size="sm"
        aria-label="logout"
        color="blackAlpha.600"
        bg="transparent"
        _hover={{
          color: 'blackAlpha.800',
          bg: 'blackAlpha.300'
        }}
        onClick={() => logout({ returnTo: process.env.BASE_URL })}
      >
        <Icon.LogOut />
      </IconButton>
    </Flex>
  )
}

export default User
