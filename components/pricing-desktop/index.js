import {
  Box,
  Link,
  Button,
  Heading,
  Grid,
  GridItem,
  Text
} from '@chakra-ui/react'
import { LINKS, PRICES } from '../../constants'
import Col from './col'
import ColCheck from './col-check'
import ColDescription from './col-description'
import CustomTooltip from './col-tooltip'

function DesktopTable() {
  return (
    <Grid templateColumns="repeat(4, 1fr)">
      {/**/}

      <Col />
      <Col>
        <Heading tag="h5" fontSize="2xl">
          Free
        </Heading>
      </Col>
      <Col highlight style={{ borderRadius: '16px 16px 0 0' }}>
        <Heading tag="h5" fontSize="2xl">
          Standard
        </Heading>
      </Col>
      <Col>
        <Heading tag="h5" fontSize="2xl">
          Premium
        </Heading>
      </Col>

      <GridItem colSpan={4}>
        <Box height="1px" bg="whiteAlpha.100" />
      </GridItem>

      <ColDescription>
        <Text as="span">
          {PRICES.commandsLimit.title}
          <CustomTooltip>{PRICES.commandsLimit.description}</CustomTooltip>
        </Text>
      </ColDescription>
      <Col>
        <Text as="span">{PRICES.commandsLimit.free}</Text>
      </Col>
      <Col highlight>
        <Text as="span">{PRICES.commandsLimit.standard}</Text>
      </Col>
      <Col>
        <Text as="span">{PRICES.commandsLimit.premium}</Text>
      </Col>

      <GridItem colSpan={4}>
        <Box height="1px" bg="whiteAlpha.100" />
      </GridItem>

      <ColDescription>
        <Text as="span">
          {PRICES.maxDataSizePerDB.title}
          <CustomTooltip>{PRICES.maxDataSizePerDB.description}</CustomTooltip>
        </Text>
      </ColDescription>
      <Col>
        <Text as="span">{PRICES.maxDataSizePerDB.free}</Text>
      </Col>
      <Col highlight>
        <Text as="span">{PRICES.maxDataSizePerDB.standard}</Text>
      </Col>
      <Col>
        <Text as="span">{PRICES.maxDataSizePerDB.premium}</Text>
      </Col>

      <GridItem colSpan={4}>
        <Box height="1px" bg="whiteAlpha.100" />
      </GridItem>

      <ColDescription>
        <Text as="span">
          {PRICES.maxConcurrentConnections.title}
          <CustomTooltip>
            {PRICES.maxConcurrentConnections.description}
          </CustomTooltip>
        </Text>
      </ColDescription>
      <Col>
        <Text as="span">{PRICES.maxConcurrentConnections.free}</Text>
      </Col>
      <Col highlight>
        <Text as="span">{PRICES.maxConcurrentConnections.standard}</Text>
      </Col>
      <Col>
        <Text as="span">{PRICES.maxConcurrentConnections.premium}</Text>
      </Col>

      <GridItem colSpan={4}>
        <Box height="1px" bg="whiteAlpha.100" />
      </GridItem>

      <ColDescription>
        <Text as="span">
          {PRICES.persistence.title}
          <CustomTooltip>{PRICES.persistence.description}</CustomTooltip>
        </Text>
      </ColDescription>
      <Col>
        <ColCheck check={PRICES.persistence.free} />
      </Col>
      <Col highlight>
        <ColCheck check={PRICES.persistence.standard} />
      </Col>
      <Col>
        <ColCheck check={PRICES.persistence.premium} />
      </Col>

      <GridItem colSpan={4}>
        <Box height="1px" bg="whiteAlpha.100" />
      </GridItem>

      <ColDescription>
        <Text as="span">
          {PRICES.encryption.title}
          <CustomTooltip>{PRICES.encryption.description}</CustomTooltip>
        </Text>
      </ColDescription>
      <Col>
        <ColCheck check={PRICES.encryption.free} />
      </Col>
      <Col highlight>
        <ColCheck check={PRICES.encryption.free} />
      </Col>
      <Col>
        <ColCheck check={PRICES.encryption.free} />
      </Col>

      <GridItem colSpan={4}>
        <Box height="1px" bg="whiteAlpha.100" />
      </GridItem>

      <ColDescription>
        <Text as="span">
          {PRICES.multiZoneReplication.title}
          <CustomTooltip>
            {PRICES.multiZoneReplication.description}
          </CustomTooltip>
        </Text>
      </ColDescription>
      <Col>
        <ColCheck check={PRICES.multiZoneReplication.free} />
      </Col>
      <Col highlight>
        <ColCheck check={PRICES.multiZoneReplication.standard} />
      </Col>
      <Col>
        <ColCheck check={PRICES.multiZoneReplication.premium} />
      </Col>

      <GridItem colSpan={4}>
        <Box height="1px" bg="whiteAlpha.100" />
      </GridItem>

      <ColDescription />
      <Col>
        <div>
          <Text as="p">{PRICES.price.free}</Text>
          <Text as="span" fontSize="xs" color="whiteAlpha.600">
            {PRICES.price.freeDetail}
          </Text>
        </div>
      </Col>
      <Col highlight>
        <div>
          <Text as="p">{PRICES.price.standard}</Text>
          <Text as="span" fontSize="xs" color="whiteAlpha.600">
            {PRICES.price.standardDetail}
          </Text>
        </div>
      </Col>
      <Col>
        <div>
          <Text as="p">{PRICES.price.premium}</Text>
          <Text as="span" fontSize="xs" color="whiteAlpha.600">
            {PRICES.price.premiumDetail}
          </Text>
        </div>
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
            textDecoration: 'none'
          }}
        >
          Start for free
        </Button>
      </Col>
      <Col highlight style={{ borderRadius: '0 0 16px 16px' }}>
        <Button
          as={Link}
          href={LINKS.console}
          color="black"
          bg="primary"
          _hover={{
            textDecoration: 'none'
          }}
        >
          Login
        </Button>
      </Col>
      <Col>
        <Button
          as={Link}
          href={LINKS.console}
          color="black"
          bg="white"
          _hover={{
            textDecoration: 'none'
          }}
        >
          Login
        </Button>
      </Col>

      {/**/}
    </Grid>
  )
}

export default DesktopTable
