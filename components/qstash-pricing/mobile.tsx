import { Button, Flex, VStack, Heading, Text } from "@chakra-ui/react";
import { QSTASH_PRICES } from "constants/";
import { Title } from "../redis-pricing-mobile";

export default function QStashMobileTable() {
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
              <Title>{QSTASH_PRICES.maxRequestPerDay.title}</Title>
              <Text>{QSTASH_PRICES.maxRequestPerDay[key]}</Text>
            </Flex>

            <Flex direction="column" align="center">
              <Title>{QSTASH_PRICES.maxMessageSize.title}</Title>
              <Text>{QSTASH_PRICES.maxMessageSize[key]}</Text>
            </Flex>

            <Flex direction="column" align="center">
              <Title>{QSTASH_PRICES.maxRetryCount.title}</Title>
              <Text>{QSTASH_PRICES.maxRetryCount[key]}</Text>
            </Flex>

            <Flex direction="column" align="center">
              <Title>{QSTASH_PRICES.maxNumberOfSchedules.title}</Title>
              <Text>{QSTASH_PRICES.maxNumberOfSchedules[key]}</Text>
            </Flex>

            <Flex direction="column" align="center">
              <Title>{QSTASH_PRICES.price.title}</Title>
              <div>
                <Text as="p">{QSTASH_PRICES.price[key]}</Text>
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
