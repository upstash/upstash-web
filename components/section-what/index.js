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
            Rails moment of <br />
            Serverless Database
          </Title>

          <Accordion>
            <Accordion.Item>
              <Accordion.Header>
                <Title tag="h4">Serverless</Title>
              </Accordion.Header>
              <Accordion.Collapse>
                <Text>
                  Upstash has been designed to be serverless from day 1. You
                  create the database without knowing about the backend servers.
                  We maintain it, we deal with any issue if anything happens.
                  With the `pay-as-you-go` pricing, you only pay when you
                  actively use the database. Your cost does not increase
                  proportionally to your data size. See Serverless Model for
                  more information.
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
                  Upstash has been designed to be serverless from day 1. You
                  create the database without knowing about the backend servers.
                  We maintain it, we deal with any issue if anything happens.
                  With the `pay-as-you-go` pricing, you only pay when you
                  actively use the database. Your cost does not increase
                  proportionally to your data size. See Serverless Model for
                  more information.
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
                <Title tag="h4">Pay As You Go</Title>
              </Accordion.Header>
              <Accordion.Collapse>
                <Text>
                  Upstash has been designed to be serverless from day 1. You
                  create the database without knowing about the backend servers.
                  We maintain it, we deal with any issue if anything happens.
                  With the `pay-as-you-go` pricing, you only pay when you
                  actively use the database. Your cost does not increase
                  proportionally to your data size. See Serverless Model for
                  more information.
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
                  Upstash has been designed to be serverless from day 1. You
                  create the database without knowing about the backend servers.
                  We maintain it, we deal with any issue if anything happens.
                  With the `pay-as-you-go` pricing, you only pay when you
                  actively use the database. Your cost does not increase
                  proportionally to your data size. See Serverless Model for
                  more information.
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
