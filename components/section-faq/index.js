import cn from 'classnames'
import Container from '../container'
import Stack from '../stack'
import { Text, Title } from '../text'
import Accordion from '../accordion'
import Link from '../link'

import styles from './index.module.css'

function SectionFaq({ children, className, ...props }) {
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
                  <Title style={{ fontSize: 'var(--fs-large)' }}>
                    What are the use cases?
                  </Title>
                </Accordion.Header>
                <Accordion.Collapse>
                  <Text>
                    Upstash works for all the common usecases for Redis®.
                    You can use Upstash in your serverless stack. In
                    addition, you can use Upstash as storage (or caching)
                    for your serverless functions.
                  </Text>
                </Accordion.Collapse>
              </Accordion.Item>

              <Accordion.Item>
                <Accordion.Header>
                  <Title style={{ fontSize: 'var(--fs-large)' }}>
                    Do you support Redis Cluster?
                  </Title>
                </Accordion.Header>
                <Accordion.Collapse>
                  <Text>
                    Most of them. See Redis® API Compatibility for the list of
                    supported commands.
                  </Text>
                </Accordion.Collapse>
              </Accordion.Item>

              <Accordion.Item>
                <Accordion.Header>
                  <Title style={{ fontSize: 'var(--fs-large)' }}>
                    Which regions do you support in AWS?
                  </Title>
                </Accordion.Header>
                <Accordion.Collapse>
                  <Text>
                    Initially we have AWS. GCP and Azure are coming soon.
                  </Text>
                </Accordion.Collapse>
              </Accordion.Item>

              <Accordion.Item>
                <Accordion.Header>
                  <Title style={{ fontSize: 'var(--fs-large)' }}>
                    I have database with 10GB data, I pay nothing if I do not
                    use it. Is that correct?
                  </Title>
                </Accordion.Header>
                <Accordion.Collapse>
                  <Text>
                    You only pay for the disk storage cost that is $0.15 per GB.
                    For your case, you will pay $1.5 monthly.
                  </Text>
                </Accordion.Collapse>
              </Accordion.Item>

              <Accordion.Item>
                <Accordion.Header>
                  <Title style={{ fontSize: 'var(--fs-large)' }}>
                    When I upgrade my free database, do I lose data?
                  </Title>
                </Accordion.Header>
                <Accordion.Collapse>
                  <Text>
                    You do not lose data but active clients may disconnect.
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
