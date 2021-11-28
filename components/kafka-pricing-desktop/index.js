import {
    Box,
    Link,
    Button,
    Heading,
    Grid,
    GridItem,
    Text
} from '@chakra-ui/react'
import {LINKS, PRICES} from '../../constants'
import Col from '../redis-pricing-desktop/col'
import ColCheck from '../redis-pricing-desktop/col-check'
import ColDescription from '../redis-pricing-desktop/col-description'
import CustomTooltip from '../redis-pricing-desktop/col-tooltip'

export default function KafkaDesktopTable() {
    return (
        <Grid templateColumns="repeat(4, 1fr)">
            {/**/}

            <Col/>
            <Col>
                <Heading as="h5" fontSize="2xl">
                    Free
                </Heading>
            </Col>
            <Col highlight style={{borderRadius: '16px 16px 0 0'}}>
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
                <Box height="1px" bg="whiteAlpha.100"/>
            </GridItem>

            <ColDescription>
                <Text as="span">
                    {PRICES.messagesLimit.title}
                    <CustomTooltip>{PRICES.messagesLimit.description}</CustomTooltip>
                </Text>
            </ColDescription>
            <Col>
                <Text as="span">{PRICES.messagesLimit.free}</Text>
            </Col>
            <Col highlight>
                <Text as="span">{PRICES.messagesLimit.payg}</Text>
            </Col>
            <Col>
                <Text as="span">{PRICES.messagesLimit.enterprise}</Text>
            </Col>

            <GridItem colSpan={4}>
                <Box height="1px" bg="whiteAlpha.100"/>
            </GridItem>

            <ColDescription>
                <Text as="span">
                    {PRICES.maxRetentionSizeLimit.title}
                    <CustomTooltip>{PRICES.maxRetentionSizeLimit.description}</CustomTooltip>
                </Text>
            </ColDescription>
            <Col>
                <Text as="span">{PRICES.maxRetentionSizeLimit.free}</Text>
            </Col>
            <Col highlight>
                <Text as="span">{PRICES.maxRetentionSizeLimit.payg}</Text>
            </Col>
            <Col>
                <Text as="span">{PRICES.maxRetentionSizeLimit.enterprise}</Text>
            </Col>
            <GridItem colSpan={4}>
                <Box height="1px" bg="whiteAlpha.100"/>
            </GridItem>

            <ColDescription>
                <Text as="span">
                    {PRICES.maxRetentionTimeLimit.title}
                    <CustomTooltip>{PRICES.maxRetentionTimeLimit.description}</CustomTooltip>
                </Text>
            </ColDescription>
            <Col>
                <Text as="span">{PRICES.maxRetentionTimeLimit.free}</Text>
            </Col>
            <Col highlight>
                <Text as="span">{PRICES.maxRetentionTimeLimit.payg}</Text>
            </Col>
            <Col>
                <Text as="span">{PRICES.maxRetentionTimeLimit.enterprise}</Text>
            </Col>

            <GridItem colSpan={4}>
                <Box height="1px" bg="whiteAlpha.100"/>
            </GridItem>

            <ColDescription>
                <Text as="span">
                    {PRICES.maxNumberOfPartitionsLimit.title}
                    <CustomTooltip>{PRICES.maxNumberOfPartitionsLimit.description}</CustomTooltip>
                </Text>
            </ColDescription>
            <Col>
                <Text as="span">{PRICES.maxNumberOfPartitionsLimit.free}</Text>
            </Col>
            <Col highlight>
                <Text as="span">{PRICES.maxNumberOfPartitionsLimit.payg}</Text>
            </Col>
            <Col>
                <Text as="span">{PRICES.maxNumberOfPartitionsLimit.enterprise}</Text>
            </Col>

            <GridItem colSpan={4}>
                <Box height="1px" bg="whiteAlpha.100"/>
            </GridItem>

            <ColDescription>
                <Text as="span">
                    {PRICES.graphqlRestApi.title}
                    <CustomTooltip>{PRICES.graphqlRestApi.description}</CustomTooltip>
                </Text>
            </ColDescription>
            <Col>
                <ColCheck check={PRICES.graphqlRestApi.free}/>
            </Col>
            <Col highlight>
                <ColCheck check={PRICES.graphqlRestApi.payg}/>
            </Col>
            <Col>
                <ColCheck check={PRICES.graphqlRestApi.enterprise}/>
            </Col>

            <GridItem colSpan={4}>
                <Box height="1px" bg="whiteAlpha.100"/>
            </GridItem>

            <ColDescription>
                <Text as="span">
                    {PRICES.multiZoneReplicationKafka.title}
                    <CustomTooltip>
                        {PRICES.multiZoneReplicationKafka.description}
                    </CustomTooltip>
                </Text>
            </ColDescription>
            <Col>
                <ColCheck check={PRICES.multiZoneReplicationKafka.free}/>
            </Col>
            <Col highlight>
                <ColCheck check={PRICES.multiZoneReplicationKafka.payg}/>
            </Col>
            <Col>
                <ColCheck check={PRICES.multiZoneReplicationKafka.enterprise}/>
            </Col>

            <GridItem colSpan={4}>
                <Box height="1px" bg="whiteAlpha.100"/>
            </GridItem>

            <ColDescription>
                <Text as="span">
                    {PRICES.vpcPeering.title}
                    <CustomTooltip>{PRICES.vpcPeering.description}</CustomTooltip>
                </Text>
            </ColDescription>
            <Col>
                <ColCheck check={PRICES.vpcPeering.free}/>
            </Col>
            <Col highlight>
                <ColCheck check={PRICES.vpcPeering.payg}/>
            </Col>
            <Col>
                <ColCheck check={PRICES.vpcPeering.enterprise}/>
            </Col>

            <GridItem colSpan={4}>
                <Box height="1px" bg="whiteAlpha.100"/>
            </GridItem>

            <ColDescription>
                <Text as="span">
                    {PRICES.support.title}
                    <CustomTooltip>{PRICES.support.description}</CustomTooltip>
                </Text>
            </ColDescription>
            <Col>
                <ColCheck check={PRICES.support.free}/>
            </Col>
            <Col highlight>
                <Text as="span">{PRICES.support.payg}</Text>
            </Col>
            <Col>
                <Text as="span">{PRICES.support.enterprise}</Text>
            </Col>

            <GridItem colSpan={4}>
                <Box height="1px" bg="whiteAlpha.100"/>
            </GridItem>

            <ColDescription>
                <Text as="span">
                    {PRICES.priceKafkaSingleZone.title}
                    <CustomTooltip>{PRICES.priceKafkaSingleZone.description}</CustomTooltip>
                </Text>
            </ColDescription>
            <Col>
                <Text as="span">{PRICES.priceKafkaSingleZone.free}</Text>
            </Col>
            <Col highlight>
                <Text as="span">{PRICES.priceKafkaSingleZone.payg}</Text>
            </Col>
            <Col>
                <Text as="span">{PRICES.priceKafkaSingleZone.enterprise}</Text>
            </Col>

            <GridItem colSpan={4}>
                <Box height="1px" bg="whiteAlpha.100"/>
            </GridItem>

            <ColDescription>
                <Text as="span">
                    {PRICES.priceKafkaMultiZone.title}
                    <CustomTooltip>{PRICES.priceKafkaMultiZone.description}</CustomTooltip>
                </Text>
            </ColDescription>
            <Col>
                <Text as="span">{PRICES.priceKafkaMultiZone.free}</Text>
            </Col>
            <Col highlight>
                <Text as="span">{PRICES.priceKafkaMultiZone.payg}</Text>
            </Col>
            <Col>
                <Text as="span">{PRICES.priceKafkaMultiZone.enterprise}</Text>
            </Col>

            <GridItem colSpan={4}>
                <Box height="1px" bg="whiteAlpha.100"/>
            </GridItem>

            <Col/>
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
            <Col highlight style={{borderRadius: '0 0 16px 16px'}}>
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
                    href={LINKS.support}
                    color="black"
                    bg="white"
                    _hover={{
                        textDecoration: 'none'
                    }}
                >
                    Contact Us
                </Button>
            </Col>

            {/**/}
        </Grid>
    )
}
