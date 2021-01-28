import cn from 'classnames'
import Container from '../container'
import Bg from '../bg'
import { Text, Title } from '../text'
import Accordion from '../accordion'
import Link from '../link'
import Stack from '../stack'

import styles from './index.module.css'

function SectionWhat({ children, className, ...props }) {
  return (
    <section className={cn(styles.section, className)} {...props}>
      <Bg />
      <Container>
        <Stack gap={40} gapT={80}>
          <Title tag="h2">
            Rails Moment of <br />
            Serverless Database
          </Title>

          <Accordion>
            <Accordion.Item>
              <Accordion.Header>
                <Title tag="h4">No Ops</Title>
              </Accordion.Header>
              <Accordion.Collapse>
                <Text>
                  Upstash has been designed to be Serverless from day 1.
                  You start using the database, knowing nothing about the
                  servers. We maintain it, we scale it, we deal with any issue.
                  You focus on what you are building.
                </Text>
                <Text>
                  <Link external primary href="/">
                    See more
                  </Link>
                </Text>
              </Accordion.Collapse>
            </Accordion.Item>

            <Accordion.Item>
              <Accordion.Header>
                <Title tag="h4">Low Latency For Low Cost</Title>
              </Accordion.Header>
              <Accordion.Collapse>
                <Text>
                  In Serverless world, extra millisecond is a cost.
                  That's why we optimize Upstash for low latency.
                  In-memory-data makes Upstash faster than DynamoDB and Fauna.
                  Pay-per-request model makes Upstash more affordable than ElastiCache and RedisLabs.
                </Text>
                <Text>
                  <Link external primary href="/">
                    See more
                  </Link>
                </Text>
              </Accordion.Collapse>
            </Accordion.Item>

            <Accordion.Item>
              <Accordion.Header>
                <Title tag="h4">Simple Pricing, No Surprises</Title>
              </Accordion.Header>
              <Accordion.Collapse>
                <Text>
                  In Upstash pricing model, you pay per request.
                  If you are not using the database, you are not paying.
                  The max monthly (ceiling) price, guarantees that you will not pay more than ceiling price <br/>
                  (that is $120 per month for Standard databases).
                </Text>
                <Text>
                  <Link external primary href="/">
                    See more
                  </Link>
                </Text>
              </Accordion.Collapse>
            </Accordion.Item>

            <Accordion.Item>
              <Accordion.Header>
                <Title tag="h4">Redis® Compatible</Title>
              </Accordion.Header>
              <Accordion.Collapse>
                <Text>
                  We have implemented data structures compatible with the Redis® API.
                  Upstash works with all Redis clients, so you can run your legacy code without changing a line.
                  Upstash provides you low latency and high availability minimizing operational burden.
                </Text>
                <Text>
                  <Link external primary href="/">
                    See more
                  </Link>
                </Text>
              </Accordion.Collapse>
            </Accordion.Item>
          </Accordion>
        </Stack>
      </Container>
    </section>
  )
}

export default SectionWhat
