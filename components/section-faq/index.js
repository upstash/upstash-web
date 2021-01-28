import cn from 'classnames'
import Container from '../container'
import Stack from '../stack'
import {Text, Title} from '../text'
import Accordion from '../accordion'
import Link from '../link'

import styles from './index.module.css'

function SectionFaq({children, className, ...props}) {
    return (
        <section className={cn(styles.section, className)} {...props}>
            <Container>
                <Stack gap={40} gapT={80}>
                    <Stack gap={16}>
                        <Title tag="h2">FAQ</Title>
                        <Text size="large" color="textLight">
                            Frequently Asked Questions
                        </Text>
                    </Stack>

                    <Stack gap={24}>
                        <Accordion>
                            <Accordion.Item>
                                <Accordion.Header>
                                    <Title style={{fontSize: 'var(--fs-large)'}}>
                                        What does it mean Serverless Database?
                                    </Title>
                                </Accordion.Header>
                                <Accordion.Collapse>
                                    <Text>
                                        You do not have to plan and provision servers. You do not deal with configuring
                                        or maintaining any server. You just use the service and pay per request. You do not pay if you are not using.
                                    </Text>
                                </Accordion.Collapse>
                            </Accordion.Item>

                            <Accordion.Item>
                                <Accordion.Header>
                                    <Title style={{fontSize: 'var(--fs-large)'}}>
                                        My stack is not serverless. Can I use Upstash?
                                    </Title>
                                </Accordion.Header>
                                <Accordion.Collapse>
                                    <Text>
                                        Absolutely. Your application can be running on an EC2 Instance or a container, still you can use Upstash.
                                    </Text>
                                </Accordion.Collapse>
                            </Accordion.Item>

                            <Accordion.Item>
                                <Accordion.Header>
                                    <Title style={{fontSize: 'var(--fs-large)'}}>
                                        How do you compare Upstash with Elasticache and RedisLabs?
                                    </Title>
                                </Accordion.Header>
                                <Accordion.Collapse>
                                    <Text>
                                        With ElastiCache or Redislabs you pay even you do not utilize the database.
                                        Their price is based on provisioned memory size. Upstash pricing is pay per request.
                                    </Text>
                                </Accordion.Collapse>
                            </Accordion.Item>

                            <Accordion.Item>
                                <Accordion.Header>
                                    <Title style={{fontSize: 'var(--fs-large)'}}>
                                        What about Dynamodb and Fauna?
                                    </Title>
                                </Accordion.Header>
                                <Accordion.Collapse>
                                    <Text>
                                        DynamoDB can not compete with Upstash on latency.
                                        In Upstash the latency of a read query is submillisecond while it is up to 10 msec in DynamoDB.
                                        Besides latency, you will miss the simplicity and elegance of Redis API much if you are working with DynamoDB.
                                        Moreover your investment into the DynamoDB worthies only if you are on AWS meanwhile Redis is everywhere.
                                        <br/>
                                        <br/>
                                        Fauna's latency is even worse than Dynamodb because they replicate the data to multiple regions in a strongly consistent way.
                                        If your use case is very consistency sensitive, then Fauna is good. Otherwise, it is slow and expensive.
                                    </Text>
                                </Accordion.Collapse>
                            </Accordion.Item>
                          
                        </Accordion>

                        <div>
                            <Link external primary href="/">
                                See more FAQs
                            </Link>
                        </div>
                    </Stack>
                </Stack>
            </Container>
        </section>
    )
}

export default SectionFaq
