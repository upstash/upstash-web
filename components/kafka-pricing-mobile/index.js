import { Button, Flex, VStack, Heading, Text } from '@chakra-ui/react'
import { PRICES } from '../../constants'
import ColCheck from '../redis-pricing-desktop/col-check'
import { Title } from '../redis-pricing-mobile'

export default function KafkaMobileTable() {
  return (
    <VStack spacing={10} align="stretch">
      {['free', 'payg', 'enterprise'].map((key) => {
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
              {key === 'payg' && 'Pay as you go'}
              {key === 'enterprise' && 'Enterprise'}
            </Heading>

            <Flex direction="column" align="center">
              <Title>{PRICES.commandsLimit.title}</Title>
              <Text>{PRICES.commandsLimit[key]}</Text>
            </Flex>

            <Flex direction="column" align="center">
              <Title>{PRICES.strongConsistency.title}</Title>
              <ColCheck check={PRICES.strongConsistency[key]} />
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
              <Title>{PRICES.graphqlRestApi.title}</Title>
              <ColCheck check={PRICES.graphqlRestApi[key]} />
            </Flex>

            <Flex direction="column" align="center">
              <Title>{PRICES.multiZoneReplication.title}</Title>
              <ColCheck check={PRICES.multiZoneReplication[key]} />
            </Flex>

            <Flex direction="column" align="center">
              <Title>{PRICES.vpcPeering.title}</Title>
              <ColCheck check={PRICES.vpcPeering[key]} />
            </Flex>

            <Flex direction="column" align="center">
              <Title>{PRICES.support.title}</Title>
              {typeof PRICES.support[key] === 'boolean' ? (
                <ColCheck check={PRICES.support[key]} />
              ) : (
                <Text>{PRICES.support[key]}</Text>
              )}
            </Flex>

            <Flex direction="column" align="center">
              <Title>{PRICES.price.title}</Title>
              <div>
                <Text as="p">{PRICES.price[key]}</Text>
                <Text as="span" fontSize="xs" color="whiteAlpha.600">
                  {PRICES.price[`${key}Detail`]}
                </Text>
              </div>
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
