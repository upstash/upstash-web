import { Button, Flex, VStack, Heading, Text } from "@chakra-ui/react";
import { KAFKA_PRICES } from "constants/";
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
              <Title>{KAFKA_PRICES.messagesLimit.title}</Title>
              <Text>{KAFKA_PRICES.messagesLimit[key]}</Text>
            </Flex>

            <Flex direction="column" align="center">
              <Title>{KAFKA_PRICES.maxRetentionSizeLimit.title}</Title>
              <Text>{KAFKA_PRICES.maxRetentionSizeLimit[key]}</Text>
            </Flex>

            <Flex direction="column" align="center">
              <Title>{KAFKA_PRICES.maxRetentionTimeLimit.title}</Title>
              <Text>{KAFKA_PRICES.maxRetentionTimeLimit[key]}</Text>
            </Flex>

            <Flex direction="column" align="center">
              <Title>{KAFKA_PRICES.maxNumberOfPartitionsLimit.title}</Title>
              <Text>{KAFKA_PRICES.maxNumberOfPartitionsLimit[key]}</Text>
            </Flex>

            <Flex direction="column" align="center">
              <Title>{KAFKA_PRICES.restApi.title}</Title>
              <ColCheck check={KAFKA_PRICES.restApi[key]} />
            </Flex>

            <Flex direction="column" align="center">
              <Title>{KAFKA_PRICES.multiZoneReplication.title}</Title>
              <ColCheck check={KAFKA_PRICES.multiZoneReplication[key]} />
            </Flex>

            <Flex direction="column" align="center">
              <Title>{KAFKA_PRICES.vpcPeering.title}</Title>
              <ColCheck check={KAFKA_PRICES.vpcPeering[key]} />
            </Flex>

            <Flex direction="column" align="center">
              <Title>{KAFKA_PRICES.support.title}</Title>
              {typeof KAFKA_PRICES.support[key] === "boolean" ? (
                <ColCheck check={KAFKA_PRICES.support[key]} />
              ) : (
                <Text>{KAFKA_PRICES.support[key]}</Text>
              )}
            </Flex>

            <Flex direction="column" align="center">
              <Title>{KAFKA_PRICES.priceSingleZone.title}</Title>
              <div>
                <Text as="p">{KAFKA_PRICES.priceSingleZone[key]}</Text>
              </div>
            </Flex>

            <Flex direction="column" align="center">
              <Title>{KAFKA_PRICES.priceMultiZone.title}</Title>
              <div>
                <Text as="p">{KAFKA_PRICES.priceMultiZone[key]}</Text>
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
