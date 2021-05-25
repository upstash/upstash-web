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
                    Community
                </Heading>
            </Col>
            <Col highlight style={{borderRadius: '16px 16px 0 0'}}>
                <Heading tag="h5" fontSize="2xl">
                    Pro
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
                <Text as="span">{PRICES.commandsLimit.community}</Text>
            </Col>
            <Col highlight>
                <Text as="span">{PRICES.commandsLimit.pro}</Text>
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
                <ColCheck check={PRICES.strongConsistency.community}/>
            </Col>
            <Col highlight>
                <ColCheck check={PRICES.strongConsistency.pro}/>
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
                <ColCheck check={PRICES.persistence.community}/>
            </Col>
            <Col highlight>
                <ColCheck check={PRICES.persistence.pro}/>
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
                <ColCheck check={PRICES.encryption.community}/>
            </Col>
            <Col highlight>
                <ColCheck check={PRICES.encryption.pro}/>
            </Col>
            <Col>
                <ColCheck check={PRICES.encryption.enterprise}/>
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
                <ColCheck check={PRICES.multiZoneReplication.community}/>
            </Col>
            <Col highlight>
                <ColCheck check={PRICES.multiZoneReplication.pro}/>
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
                <ColCheck check={PRICES.vpcPeering.community}/>
            </Col>
            <Col highlight>
                <ColCheck check={PRICES.vpcPeering.pro}/>
            </Col>
            <Col>
                <ColCheck check={PRICES.vpcPeering.enterprise}/>
            </Col>

            <GridItem colSpan={4}>
                <Box height="1px" bg="whiteAlpha.100"/>
            </GridItem>

            <ColDescription/>
            <Col>
                <Text as="span">{PRICES.price.community}</Text>
            </Col>
            <Col highlight>
                <Text as="span">{PRICES.price.pro}</Text>
            </Col>
            <Col>
                <Text as="span">{PRICES.price.enterprise}</Text>
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
