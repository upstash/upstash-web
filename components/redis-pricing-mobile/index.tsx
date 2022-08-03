import { Button, Flex, VStack, Heading, Text } from "@chakra-ui/react";
import { REDIS_PRICES } from "constants/";
import ColCheck from "../redis-pricing-desktop/col-check";

export function Title({ children }) {
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
  );
}

export default function RedisMobileTable() {
  return (
    <VStack spacing={10} align="stretch">
      {["free", "payg", "enterprise"].map((key) => {
        return (
          <VStack
            key={key}
            spacing={4}
            p={6}
            bg="whiteAlpha.200"
            borderRadius="2xl"
          >
            <Heading as="h4" fontSize="2xl">
              {key === "free" && "Free"}
              {key === "payg" && "Pay as you go"}
              {key === "enterprise" && "Enterprise"}
            </Heading>

            <Flex direction="column" align="center">
              <Title>{REDIS_PRICES.commandsLimit.title}</Title>
              <Text>{REDIS_PRICES.commandsLimit[key]}</Text>
            </Flex>

            <Flex direction="column" align="center">
              <Title>{REDIS_PRICES.persistence.title}</Title>
              <ColCheck check={REDIS_PRICES.persistence[key]} />
            </Flex>

            <Flex direction="column" align="center">
              <Title>{REDIS_PRICES.encryption.title}</Title>
              <ColCheck check={REDIS_PRICES.encryption[key]} />
            </Flex>

            <Flex direction="column" align="center">
              <Title>{REDIS_PRICES.restApi.title}</Title>
              <ColCheck check={REDIS_PRICES.restApi[key]} />
            </Flex>

            <Flex direction="column" align="center">
              <Title>{REDIS_PRICES.multiZoneReplication.title}</Title>
              <ColCheck check={REDIS_PRICES.multiZoneReplication[key]} />
            </Flex>

            <Flex direction="column" align="center">
              <Title>{REDIS_PRICES.vpcPeering.title}</Title>
              <ColCheck check={REDIS_PRICES.vpcPeering[key]} />
            </Flex>

            <Flex direction="column" align="center">
              <Title>{REDIS_PRICES.support.title}</Title>
              {typeof REDIS_PRICES.support[key] === "boolean" ? (
                <ColCheck check={REDIS_PRICES.support[key]} />
              ) : (
                <Text>{REDIS_PRICES.support[key]}</Text>
              )}
            </Flex>

            <Flex direction="column" align="center">
              <Title>{REDIS_PRICES.price.title}</Title>
              <div>
                <Text as="p">{REDIS_PRICES.price[key]}</Text>
                <Text as="span" fontSize="xs" color="whiteAlpha.600">
                  {REDIS_PRICES.price[`${key}Detail`]}
                </Text>
              </div>
            </Flex>

            <Flex direction="column" align="center">
              {key === "free" ? (
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
        );
      })}
    </VStack>
  );
}
