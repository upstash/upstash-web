import cn from 'classnames'
import Container from '../container'
import Bg from '../bg'
import Stack from '../stack'
import { Text, Title } from '../text'
import MobileTable from './mobileTable'
import DesktopTable from './desktopTable'
import Link from '../link'

import styles from './index.module.css'

function SectionPricing({ children, className, ...props }) {
  return (
    <section className={cn(styles.section, className)} {...props}>
      <Bg />

      <Container>
        <Stack gap={40} gapT={80}>
          <Stack gap={16}>
            <Title tag="h2">Plans & Pricing</Title>
            <div>
              <Text size="large" color="textLight">
                Flexible pricing solutions for your business
              </Text>
            </div>
          </Stack>

          <MobileTable className={styles.mobileTable} />
          <DesktopTable className={styles.desktopTable} />

          <Stack gap={8}>
            <Text color="textLight">
              Disk storage cost is $0.15 per GB per month for all database
              types.
            </Text>
            <Text color="textLight">
              See{' '}
              <Link external primary href="/">
                reserved plans
              </Link>{' '}
              pricing for high throughput use cases.
            </Text>
            <Text color="textLight">
              See{' '}
              <Link external primary href="/">
                database types
              </Link>{' '}
              for more information on databases.
            </Text>
          </Stack>
        </Stack>
      </Container>
    </section>
  )
}

export default SectionPricing
