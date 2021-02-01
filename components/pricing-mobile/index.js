import {
  Box,
  Link,
  Button,
  Flex,
  VStack,
  Heading,
  Text
} from '@chakra-ui/react'
import { PRICES } from '../../constants'
import Col from '../pricing-desktop/col'
import ColCheck from '../pricing-desktop/col-check'
import ColDescription from '../pricing-desktop/col-description'
import CustomTooltip from '../pricing-desktop/col-tooltip'

function Title({ children }) {
  return (
    <Heading
      as="h5"
      fontSize="xs"
      fontWeight="normal"
      letterSpacing="wider"
      textTransform="uppercase"
      color="whiteAlpha.600"
      mb={1}
    >
      {children}
    </Heading>
  )
}

function MobileTable() {
  return (
    <VStack spacing={10} align="stretch">
      {['free', 'standard', 'premium'].map((key) => {
        return (
          <VStack
            key={key}
            spacing={4}
            p={6}
            bg="whiteAlpha.200"
            borderRadius="2xl"
          >
            <Heading as="h4" fontSize="2xl">
              {key === 'free' && 'Free'}
              {key === 'standard' && 'Standard'}
              {key === 'premium' && 'Premium'}
            </Heading>
            <Flex direction="column" align="center">
              <Title>{PRICES.commandsLimit.title}</Title>
              <Text>{PRICES.commandsLimit[key]}</Text>
            </Flex>

            <Flex direction="column" align="center">
              <Title>{PRICES.maxDataSizePerDB.title}</Title>
              <Text>{PRICES.maxDataSizePerDB[key]}</Text>
            </Flex>

            <Flex direction="column" align="center">
              <Title>{PRICES.maxConcurrentConnections.title}</Title>
              <Text>{PRICES.maxConcurrentConnections[key]}</Text>
            </Flex>

            <Flex direction="column" align="center">
              <Title>{PRICES.persistence.title}</Title>
              <ColCheck check={PRICES.persistence[key]} />
            </Flex>

            <Flex direction="column" align="center">
              <Title>{PRICES.encryption.title}</Title>
              <ColCheck check={PRICES.encryption[key]} />
            </Flex>

            <Flex direction="column" align="center">
              <Title>{PRICES.multiZoneReplication.title}</Title>
              <ColCheck check={PRICES.multiZoneReplication[key]} />
            </Flex>

            <Flex direction="column" align="center">
              <Title>{PRICES.price.title}</Title>
              <Text>{PRICES.price[key]}</Text>
            </Flex>

            <Flex direction="column" align="center">
              {key === 'free' ? (
                <Button bg="primary" color="black">
                  Start for free
                </Button>
              ) : (
                <Button bg="white" color="black">
                  Login
                </Button>
              )}
            </Flex>
          </VStack>
        )
      })}
    </VStack>
  )
}

export default MobileTable
