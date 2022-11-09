import {
  Box,
  Link,
  Button,
  Heading,
  Grid,
  GridItem,
  Text,
} from "@chakra-ui/react";
import { LINKS, QSTASH_PRICES } from "constants/";
import Col from "../redis-pricing-desktop/col";
import ColDescription from "../redis-pricing-desktop/col-description";
import CustomTooltip from "../redis-pricing-desktop/col-tooltip";

export default function QStashDesktopTable() {
  return (
    <Grid templateColumns="repeat(4, 1fr)">
      {/**/}

      <Col />
      <Col>
        <Heading as="h5" fontSize="2xl">
          Free
        </Heading>
      </Col>
      <Col highlight style={{ borderRadius: "16px 16px 0 0" }}>
        <Heading as="h5" fontSize="2xl">
          Pay as you go
        </Heading>
      </Col>
      <Col>
        <Heading as="h5" fontSize="2xl">
          Enterprise
        </Heading>
      </Col>

      <GridItem colSpan={4}>
        <Box height="1px" bg="whiteAlpha.100" />
      </GridItem>

      <ColDescription>
        <Text as="span">
          {QSTASH_PRICES.maxRequestPerDay.title}
          <CustomTooltip>
            {QSTASH_PRICES.maxRequestPerDay.description}
          </CustomTooltip>
        </Text>
      </ColDescription>
      <Col>
        <Text as="span">{QSTASH_PRICES.maxRequestPerDay.free}</Text>
      </Col>
      <Col highlight>
        <Text as="span">{QSTASH_PRICES.maxRequestPerDay.payg}</Text>
      </Col>
      <Col>
        <Text as="span">{QSTASH_PRICES.maxRequestPerDay.enterprise}</Text>
      </Col>

      <GridItem colSpan={4}>
        <Box height="1px" bg="whiteAlpha.100" />
      </GridItem>

      <ColDescription>
        <Text as="span">
          {QSTASH_PRICES.maxMessageSize.title}
          <CustomTooltip>
            {QSTASH_PRICES.maxMessageSize.description}
          </CustomTooltip>
        </Text>
      </ColDescription>
      <Col>
        <Text as="span">{QSTASH_PRICES.maxMessageSize.free}</Text>
      </Col>
      <Col highlight>
        <Text as="span">{QSTASH_PRICES.maxMessageSize.payg}</Text>
      </Col>
      <Col>
        <Text as="span">{QSTASH_PRICES.maxMessageSize.enterprise}</Text>
      </Col>

      <GridItem colSpan={4}>
        <Box height="1px" bg="whiteAlpha.100" />
      </GridItem>

      <ColDescription>
        <Text as="span">
          {QSTASH_PRICES.maxRetryCount.title}
          <CustomTooltip>
            {QSTASH_PRICES.maxRetryCount.description}
          </CustomTooltip>
        </Text>
      </ColDescription>
      <Col>
        <Text as="span">{QSTASH_PRICES.maxRetryCount.free}</Text>
      </Col>
      <Col highlight>
        <Text as="span">{QSTASH_PRICES.maxRetryCount.payg}</Text>
      </Col>
      <Col>
        <Text as="span">{QSTASH_PRICES.maxRetryCount.enterprise}</Text>
      </Col>

      <GridItem colSpan={4}>
        <Box height="1px" bg="whiteAlpha.100" />
      </GridItem>

      <ColDescription>
        <Text as="span">
          {QSTASH_PRICES.maxRetentionTimeLimit.title}
          <CustomTooltip>
            {QSTASH_PRICES.maxRetentionTimeLimit.description}
          </CustomTooltip>
        </Text>
      </ColDescription>
      <Col>
        <Text as="span">{QSTASH_PRICES.maxRetentionTimeLimit.free}</Text>
      </Col>
      <Col highlight>
        <Text as="span">{QSTASH_PRICES.maxRetentionTimeLimit.payg}</Text>
      </Col>
      <Col>
        <Text as="span">{QSTASH_PRICES.maxRetentionTimeLimit.enterprise}</Text>
      </Col>
      <GridItem colSpan={4}>
        <Box height="1px" bg="whiteAlpha.100" />
      </GridItem>

      <ColDescription>
        <Text as="span">
          {QSTASH_PRICES.maxTimeout.title}
          <CustomTooltip>
            {QSTASH_PRICES.maxTimeout.description}
          </CustomTooltip>
        </Text>
      </ColDescription>
      <Col>
        <Text as="span">{QSTASH_PRICES.maxTimeout.free}</Text>
      </Col>
      <Col highlight>
        <Text as="span">{QSTASH_PRICES.maxTimeout.payg}</Text>
      </Col>
      <Col>
        <Text as="span">{QSTASH_PRICES.maxTimeout.enterprise}</Text>
      </Col>

      <GridItem colSpan={4}>
        <Box height="1px" bg="whiteAlpha.100" />
      </GridItem>

      <ColDescription>
        <Text as="span">
          {QSTASH_PRICES.price.title}
          <CustomTooltip>{QSTASH_PRICES.price.description}</CustomTooltip>
        </Text>
      </ColDescription>
      <Col>
        <Text as="span">{QSTASH_PRICES.price.free}</Text>
      </Col>
      <Col highlight>
        <Text as="span">{QSTASH_PRICES.price.payg}</Text>
      </Col>
      <Col>
        <Text as="span">{QSTASH_PRICES.price.enterprise}</Text>
      </Col>

      <GridItem colSpan={4}>
        <Box height="1px" bg="whiteAlpha.100" />
      </GridItem>

      <Col />
      <Col>
        <Button
          as={Link}
          href={LINKS.console}
          color="black"
          bg="white"
          _hover={{
            textDecoration: "none",
          }}
        >
          Start for free
        </Button>
      </Col>
      <Col highlight style={{ borderRadius: "0 0 16px 16px" }}>
        <Button
          as={Link}
          href={LINKS.console}
          color="black"
          bg="primary"
          _hover={{
            textDecoration: "none",
          }}
        >
          Login
        </Button>
      </Col>
      <Col>
        <Button
          as={Link}
          href={LINKS.support}
          color="black"
          bg="white"
          _hover={{
            textDecoration: "none",
          }}
        >
          Contact Us
        </Button>
      </Col>

      {/**/}
    </Grid>
  );
}
