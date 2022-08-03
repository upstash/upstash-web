import {
  Box,
  Link,
  Button,
  Heading,
  Grid,
  GridItem,
  Text,
} from "@chakra-ui/react";
import { LINKS, KAFKA_PRICES } from "constants/";
import Col from "../redis-pricing-desktop/col";
import ColCheck from "../redis-pricing-desktop/col-check";
import ColDescription from "../redis-pricing-desktop/col-description";
import CustomTooltip from "../redis-pricing-desktop/col-tooltip";

export default function KafkaDesktopTable() {
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
          {KAFKA_PRICES.messagesLimit.title}
          <CustomTooltip>
            {KAFKA_PRICES.messagesLimit.description}
          </CustomTooltip>
        </Text>
      </ColDescription>
      <Col>
        <Text as="span">{KAFKA_PRICES.messagesLimit.free}</Text>
      </Col>
      <Col highlight>
        <Text as="span">{KAFKA_PRICES.messagesLimit.payg}</Text>
      </Col>
      <Col>
        <Text as="span">{KAFKA_PRICES.messagesLimit.enterprise}</Text>
      </Col>

      <GridItem colSpan={4}>
        <Box height="1px" bg="whiteAlpha.100" />
      </GridItem>

      <ColDescription>
        <Text as="span">
          {KAFKA_PRICES.maxRetentionSizeLimit.title}
          <CustomTooltip>
            {KAFKA_PRICES.maxRetentionSizeLimit.description}
          </CustomTooltip>
        </Text>
      </ColDescription>
      <Col>
        <Text as="span">{KAFKA_PRICES.maxRetentionSizeLimit.free}</Text>
      </Col>
      <Col highlight>
        <Text as="span">{KAFKA_PRICES.maxRetentionSizeLimit.payg}</Text>
      </Col>
      <Col>
        <Text as="span">{KAFKA_PRICES.maxRetentionSizeLimit.enterprise}</Text>
      </Col>
      <GridItem colSpan={4}>
        <Box height="1px" bg="whiteAlpha.100" />
      </GridItem>

      <ColDescription>
        <Text as="span">
          {KAFKA_PRICES.maxRetentionTimeLimit.title}
          <CustomTooltip>
            {KAFKA_PRICES.maxRetentionTimeLimit.description}
          </CustomTooltip>
        </Text>
      </ColDescription>
      <Col>
        <Text as="span">{KAFKA_PRICES.maxRetentionTimeLimit.free}</Text>
      </Col>
      <Col highlight>
        <Text as="span">{KAFKA_PRICES.maxRetentionTimeLimit.payg}</Text>
      </Col>
      <Col>
        <Text as="span">{KAFKA_PRICES.maxRetentionTimeLimit.enterprise}</Text>
      </Col>

      <GridItem colSpan={4}>
        <Box height="1px" bg="whiteAlpha.100" />
      </GridItem>

      <ColDescription>
        <Text as="span">
          {KAFKA_PRICES.maxNumberOfPartitionsLimit.title}
          <CustomTooltip>
            {KAFKA_PRICES.maxNumberOfPartitionsLimit.description}
          </CustomTooltip>
        </Text>
      </ColDescription>
      <Col>
        <Text as="span">{KAFKA_PRICES.maxNumberOfPartitionsLimit.free}</Text>
      </Col>
      <Col highlight>
        <Text as="span">{KAFKA_PRICES.maxNumberOfPartitionsLimit.payg}</Text>
      </Col>
      <Col>
        <Text as="span">
          {KAFKA_PRICES.maxNumberOfPartitionsLimit.enterprise}
        </Text>
      </Col>

      <GridItem colSpan={4}>
        <Box height="1px" bg="whiteAlpha.100" />
      </GridItem>

      <ColDescription>
        <Text as="span">
          {KAFKA_PRICES.restApi.title}
          <CustomTooltip>{KAFKA_PRICES.restApi.description}</CustomTooltip>
        </Text>
      </ColDescription>
      <Col>
        <ColCheck check={KAFKA_PRICES.restApi.free} />
      </Col>
      <Col highlight>
        <ColCheck check={KAFKA_PRICES.restApi.payg} />
      </Col>
      <Col>
        <ColCheck check={KAFKA_PRICES.restApi.enterprise} />
      </Col>

      <GridItem colSpan={4}>
        <Box height="1px" bg="whiteAlpha.100" />
      </GridItem>

      <ColDescription>
        <Text as="span">
          {KAFKA_PRICES.multiZoneReplication.title}
          <CustomTooltip>
            {KAFKA_PRICES.multiZoneReplication.description}
          </CustomTooltip>
        </Text>
      </ColDescription>
      <Col>
        <ColCheck check={KAFKA_PRICES.multiZoneReplication.free} />
      </Col>
      <Col highlight>
        <ColCheck check={KAFKA_PRICES.multiZoneReplication.payg} />
      </Col>
      <Col>
        <ColCheck check={KAFKA_PRICES.multiZoneReplication.enterprise} />
      </Col>

      <GridItem colSpan={4}>
        <Box height="1px" bg="whiteAlpha.100" />
      </GridItem>

      <ColDescription>
        <Text as="span">
          {KAFKA_PRICES.vpcPeering.title}
          <CustomTooltip>{KAFKA_PRICES.vpcPeering.description}</CustomTooltip>
        </Text>
      </ColDescription>
      <Col>
        <ColCheck check={KAFKA_PRICES.vpcPeering.free} />
      </Col>
      <Col highlight>
        <ColCheck check={KAFKA_PRICES.vpcPeering.payg} />
      </Col>
      <Col>
        <ColCheck check={KAFKA_PRICES.vpcPeering.enterprise} />
      </Col>

      <GridItem colSpan={4}>
        <Box height="1px" bg="whiteAlpha.100" />
      </GridItem>

      <ColDescription>
        <Text as="span">
          {KAFKA_PRICES.support.title}
          <CustomTooltip>{KAFKA_PRICES.support.description}</CustomTooltip>
        </Text>
      </ColDescription>
      <Col>
        <ColCheck check={KAFKA_PRICES.support.free} />
      </Col>
      <Col highlight>
        <Text as="span">{KAFKA_PRICES.support.payg}</Text>
      </Col>
      <Col>
        <Text as="span">{KAFKA_PRICES.support.enterprise}</Text>
      </Col>

      <GridItem colSpan={4}>
        <Box height="1px" bg="whiteAlpha.100" />
      </GridItem>

      <ColDescription>
        <Text as="span">
          {KAFKA_PRICES.priceSingleZone.title}
          <CustomTooltip>
            {KAFKA_PRICES.priceSingleZone.description}
          </CustomTooltip>
        </Text>
      </ColDescription>
      <Col>
        <Text as="span">{KAFKA_PRICES.priceSingleZone.free}</Text>
      </Col>
      <Col highlight>
        <Text as="span">{KAFKA_PRICES.priceSingleZone.payg}</Text>
      </Col>
      <Col>
        <Text as="span">{KAFKA_PRICES.priceSingleZone.enterprise}</Text>
      </Col>

      <GridItem colSpan={4}>
        <Box height="1px" bg="whiteAlpha.100" />
      </GridItem>

      <ColDescription>
        <Text as="span">
          {KAFKA_PRICES.priceMultiZone.title}
          <CustomTooltip>
            {KAFKA_PRICES.priceMultiZone.description}
          </CustomTooltip>
        </Text>
      </ColDescription>
      <Col>
        <Text as="span">{KAFKA_PRICES.priceMultiZone.free}</Text>
      </Col>
      <Col highlight>
        <Text as="span">{KAFKA_PRICES.priceMultiZone.payg}</Text>
      </Col>
      <Col>
        <Text as="span">{KAFKA_PRICES.priceMultiZone.enterprise}</Text>
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
