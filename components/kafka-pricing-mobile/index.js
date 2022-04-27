import { Button, Flex, VStack, Heading, Text } from "@chakra-ui/react";
import { PRICES } from "constants/index.js";
import ColCheck from "../redis-pricing-desktop/col-check";
import { Title } from "../redis-pricing-mobile";

export default function KafkaMobileTable() {
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
              <Title>{PRICES.messagesLimit.title}</Title>
              <Text>{PRICES.messagesLimit[key]}</Text>
            </Flex>

            <Flex direction="column" align="center">
              <Title>{PRICES.maxRetentionSizeLimit.title}</Title>
              <Text>{PRICES.maxRetentionSizeLimit[key]}</Text>
            </Flex>

            <Flex direction="column" align="center">
              <Title>{PRICES.maxRetentionTimeLimit.title}</Title>
              <Text>{PRICES.maxRetentionTimeLimit[key]}</Text>
            </Flex>

            <Flex direction="column" align="center">
              <Title>{PRICES.maxNumberOfPartitionsLimit.title}</Title>
              <Text>{PRICES.maxNumberOfPartitionsLimit[key]}</Text>
            </Flex>

            <Flex direction="column" align="center">
              <Title>{PRICES.graphqlRestApi.title}</Title>
              <ColCheck check={PRICES.graphqlRestApi[key]} />
            </Flex>

            <Flex direction="column" align="center">
              <Title>{PRICES.multiZoneReplicationKafka.title}</Title>
              <ColCheck check={PRICES.multiZoneReplicationKafka[key]} />
            </Flex>

            <Flex direction="column" align="center">
              <Title>{PRICES.vpcPeering.title}</Title>
              <ColCheck check={PRICES.vpcPeering[key]} />
            </Flex>

            <Flex direction="column" align="center">
              <Title>{PRICES.support.title}</Title>
              {typeof PRICES.support[key] === "boolean" ? (
                <ColCheck check={PRICES.support[key]} />
              ) : (
                <Text>{PRICES.support[key]}</Text>
              )}
            </Flex>

            <Flex direction="column" align="center">
              <Title>{PRICES.priceKafkaSingleZone.title}</Title>
              <div>
                <Text as="p">{PRICES.priceKafkaSingleZone[key]}</Text>
              </div>
            </Flex>

            <Flex direction="column" align="center">
              <Title>{PRICES.priceKafkaMultiZone.title}</Title>
              <div>
                <Text as="p">{PRICES.priceKafkaMultiZone[key]}</Text>
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
