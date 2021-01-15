import cn from 'classnames'
import Container from '../container'
import { Text, Title } from '../text'
import Stack from '../stack'
import IconRedis from './icon-redis'
import IconNext from './icon-next'
import IconAws from './icon-aws'
import { Col, Grid } from '../grid'
import SupportBox from './box'

import styles from './index.module.css'

function SectionSupport({ children, className, ...props }) {
  return (
    <section className={cn(styles.section, className)} {...props}>
      <Container>
        <Stack gap={40} gapT={80}>
          <Stack gap={16}>
            <Title tag="h2">
              Supports any <br />
              Modern Framework
            </Title>
            <Text size="large" color="textLight">
              UpStash simplifies database access, saves repetitive CRUD
              boilerplate and increases type safety It's the perfect database
              toolkit for building robust and scalable web APIs.
            </Text>
          </Stack>

          <Grid col={1} col-t={3}>
            <Col span={1}>
              <SupportBox theme="next">
                <IconNext />
                <Text>
                  Check out docs to <br />
                  <Text tag="b" weight="medium">
                    Next
                  </Text>
                </Text>
              </SupportBox>
            </Col>
            <Col span={1}>
              <SupportBox theme="aws">
                <IconAws />
                <Text>
                  Check out docs to <br />
                  <Text tag="b" weight="medium">
                    AWS Lambda
                  </Text>
                </Text>
              </SupportBox>
            </Col>
            <Col span={1}>
              <SupportBox theme="redis">
                <IconRedis />
                <Text>
                  Check out docs to <br />
                  <Text tag="b" weight="medium">
                    Redis
                  </Text>
                </Text>
              </SupportBox>
            </Col>
          </Grid>
        </Stack>
      </Container>
    </section>
  )
}

export default SectionSupport
