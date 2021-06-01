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
import Col from './col'
import ColCheck from './col-check'
import ColDescription from './col-description'
import CustomTooltip from './col-tooltip'

function DesktopTable() {
    return (
        <Grid templateColumns="repeat(4, 1fr)">
            {/**/}

            <Col/>
            <Col>
                <Heading tag="h5" fontSize="2xl">
                    Free
                </Heading>
            </Col>
            <Col highlight style={{borderRadius: '16px 16px 0 0'}}>
                <Heading tag="h5" fontSize="2xl">
                    Pay as you go
                </Heading>
            </Col>
            <Col>
                <Heading tag="h5" fontSize="2xl">
                    Enterprise
                </Heading>
            </Col>

            <GridItem colSpan={4}>
                <Box height="1px" bg="whiteAlpha.100"/>
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
                <Text as="span">{PRICES.commandsLimit.payg}</Text>
            </Col>
            <Col>
                <Text as="span">{PRICES.commandsLimit.enterprise}</Text>
            </Col>

            <GridItem colSpan={4}>
                <Box height="1px" bg="whiteAlpha.100"/>
            </GridItem>

            <ColDescription>
                <Text as="span">
                    {PRICES.strongConsistency.title}
                    <CustomTooltip>{PRICES.strongConsistency.description}</CustomTooltip>
                </Text>
            </ColDescription>
            <Col>
                <ColCheck check={PRICES.strongConsistency.free}/>
            </Col>
            <Col highlight>
                <ColCheck check={PRICES.strongConsistency.payg}/>
            </Col>
            <Col>
                <ColCheck check={PRICES.strongConsistency.enterprise}/>
            </Col>

            <GridItem colSpan={4}>
                <Box height="1px" bg="whiteAlpha.100"/>
            </GridItem>

            <ColDescription>
                <Text as="span">
                    {PRICES.persistence.title}
                    <CustomTooltip>{PRICES.persistence.description}</CustomTooltip>
                </Text>
            </ColDescription>
            <Col>
                <ColCheck check={PRICES.persistence.free}/>
            </Col>
            <Col highlight>
                <ColCheck check={PRICES.persistence.payg}/>
            </Col>
            <Col>
                <ColCheck check={PRICES.persistence.enterprise}/>
            </Col>

            <GridItem colSpan={4}>
                <Box height="1px" bg="whiteAlpha.100"/>
            </GridItem>

            <ColDescription>
                <Text as="span">
                    {PRICES.encryption.title}
                    <CustomTooltip>{PRICES.encryption.description}</CustomTooltip>
                </Text>
            </ColDescription>
            <Col>
                <ColCheck check={PRICES.encryption.free}/>
            </Col>
            <Col highlight>
                <ColCheck check={PRICES.encryption.payg}/>
            </Col>
            <Col>
                <ColCheck check={PRICES.encryption.enterprise}/>
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
                    {PRICES.multiZoneReplication.title}
                    <CustomTooltip>
                        {PRICES.multiZoneReplication.description}
                    </CustomTooltip>
                </Text>
            </ColDescription>
            <Col>
                <ColCheck check={PRICES.multiZoneReplication.free}/>
            </Col>
            <Col highlight>
                <ColCheck check={PRICES.multiZoneReplication.payg}/>
            </Col>
            <Col>
                <ColCheck check={PRICES.multiZoneReplication.enterprise}/>
            </Col>

            <GridItem colSpan={4}>
                <Box height="1px" bg="whiteAlpha.100"/>
            </GridItem>

            <ColDescription>
                <Text as="span">
                    {PRICES.vpcPeering.title}
                    <CustomTooltip>
                        {PRICES.vpcPeering.description}
                    </CustomTooltip>
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
                    <CustomTooltip>
                        {PRICES.support.description}
                    </CustomTooltip>
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

            <ColDescription/>
            <Col>
                <Text as="span">{PRICES.price.free}</Text>
                <Text as="span" fontSize="xs" color="whiteAlpha.600">
                  {PRICES.price.freeDetail}
                </Text>
            </Col>
            <Col highlight>
                <Text as="span">{PRICES.price.payg}</Text>
                <Text as="span" fontSize="xs" color="whiteAlpha.600">
                  {PRICES.price.paygDetail}
                </Text>
            </Col>
            <Col>
                <Text as="span">{PRICES.price.enterprise}</Text>
                <Text as="span" fontSize="xs" color="whiteAlpha.600">
                  {PRICES.price.enterpriseDetail}
                </Text>
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

export default DesktopTable
