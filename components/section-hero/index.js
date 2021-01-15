import cn from 'classnames'
import Container from '../container'
import Button from '../button'
import { Text, Title } from '../text'

import styles from './index.module.css'

function SectionHero({ children, className, ...props }) {
  return (
    <section className={cn(styles.section, className)} {...props}>
      <Container>
        <Title tag="h1">
          Serverless <br />
          Database <br />
          for Redis
        </Title>

        <div className={styles.alt}>
          <Text size="large">
            Run Upstash Database without thinking about the servers.
          </Text>
          <Text className={styles.alt2} size="large">
            Start for free, then just pay for what you use.
          </Text>
        </div>

        <Button className={styles.cta} href="/" theme="primary">
          Get started for free
        </Button>
      </Container>
    </section>
  )
}

export default SectionHero
