import {
  Box,
  Link,
  Button,
  Heading,
  Grid,
  GridItem,
  Text,
} from "@chakra-ui/react";
import { LINKS, REDIS_PRICES } from "constants/";
import Col from "./col";
import ColCheck from "./col-check";
import ColDescription from "./col-description";
import CustomTooltip from "./col-tooltip";

export default function RedisDesktopTable() {
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
          {REDIS_PRICES.commandsLimit.title}
          <CustomTooltip>
            {REDIS_PRICES.commandsLimit.description}
          </CustomTooltip>
        </Text>
      </ColDescription>
      <Col>
        <Text as="span">{REDIS_PRICES.commandsLimit.free}</Text>
      </Col>
      <Col highlight>
        <Text as="span">{REDIS_PRICES.commandsLimit.payg}</Text>
      </Col>
      <Col>
        <Text as="span">{REDIS_PRICES.commandsLimit.enterprise}</Text>
      </Col>

      <GridItem colSpan={4}>
        <Box height="1px" bg="whiteAlpha.100" />
      </GridItem>

      <ColDescription>
        <Text as="span">
          {REDIS_PRICES.persistence.title}
          <CustomTooltip>{REDIS_PRICES.persistence.description}</CustomTooltip>
        </Text>
      </ColDescription>
      <Col>
        <ColCheck check={REDIS_PRICES.persistence.free} />
      </Col>
      <Col highlight>
        <ColCheck check={REDIS_PRICES.persistence.payg} />
      </Col>
      <Col>
        <ColCheck check={REDIS_PRICES.persistence.enterprise} />
      </Col>

      <GridItem colSpan={4}>
        <Box height="1px" bg="whiteAlpha.100" />
      </GridItem>

      <ColDescription>
        <Text as="span">
          {REDIS_PRICES.encryption.title}
          <CustomTooltip>{REDIS_PRICES.encryption.description}</CustomTooltip>
        </Text>
      </ColDescription>
      <Col>
        <ColCheck check={REDIS_PRICES.encryption.free} />
      </Col>
      <Col highlight>
        <ColCheck check={REDIS_PRICES.encryption.payg} />
      </Col>
      <Col>
        <ColCheck check={REDIS_PRICES.encryption.enterprise} />
      </Col>

      <GridItem colSpan={4}>
        <Box height="1px" bg="whiteAlpha.100" />
      </GridItem>

      <ColDescription>
        <Text as="span">
          {REDIS_PRICES.restApi.title}
          <CustomTooltip>{REDIS_PRICES.restApi.description}</CustomTooltip>
        </Text>
      </ColDescription>
      <Col>
        <ColCheck check={REDIS_PRICES.restApi.free} />
      </Col>
      <Col highlight>
        <ColCheck check={REDIS_PRICES.restApi.payg} />
      </Col>
      <Col>
        <ColCheck check={REDIS_PRICES.restApi.enterprise} />
      </Col>

      <GridItem colSpan={4}>
        <Box height="1px" bg="whiteAlpha.100" />
      </GridItem>

      <ColDescription>
        <Text as="span">
          {REDIS_PRICES.multiZoneReplication.title}
          <CustomTooltip>
            {REDIS_PRICES.multiZoneReplication.description}
          </CustomTooltip>
        </Text>
      </ColDescription>
      <Col>
        <ColCheck check={REDIS_PRICES.multiZoneReplication.free} />
      </Col>
      <Col highlight>
        <ColCheck check={REDIS_PRICES.multiZoneReplication.payg} />
      </Col>
      <Col>
        <ColCheck check={REDIS_PRICES.multiZoneReplication.enterprise} />
      </Col>

      <GridItem colSpan={4}>
        <Box height="1px" bg="whiteAlpha.100" />
      </GridItem>

      <ColDescription>
        <Text as="span">
          {REDIS_PRICES.vpcPeering.title}
          <CustomTooltip>{REDIS_PRICES.vpcPeering.description}</CustomTooltip>
        </Text>
      </ColDescription>
      <Col>
        <ColCheck check={REDIS_PRICES.vpcPeering.free} />
      </Col>
      <Col highlight>
        <ColCheck check={REDIS_PRICES.vpcPeering.payg} />
      </Col>
      <Col>
        <ColCheck check={REDIS_PRICES.vpcPeering.enterprise} />
      </Col>

      <GridItem colSpan={4}>
        <Box height="1px" bg="whiteAlpha.100" />
      </GridItem>

      <ColDescription>
        <Text as="span">
          {REDIS_PRICES.support.title}
          <CustomTooltip>{REDIS_PRICES.support.description}</CustomTooltip>
        </Text>
      </ColDescription>
      <Col>
        <ColCheck check={REDIS_PRICES.support.free} />
      </Col>
      <Col highlight>
        <Text as="span">{REDIS_PRICES.support.payg}</Text>
      </Col>
      <Col>
        <Text as="span">{REDIS_PRICES.support.enterprise}</Text>
      </Col>

      <GridItem colSpan={4}>
        <Box height="1px" bg="whiteAlpha.100" />
      </GridItem>

      <ColDescription />
      <Col>
        <Text as="span">{REDIS_PRICES.price.free}</Text>
      </Col>
      <Col highlight>
        <Text as="span">{REDIS_PRICES.price.payg}</Text>
      </Col>
      <Col>
        <Text as="span">{REDIS_PRICES.price.enterprise}</Text>
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
