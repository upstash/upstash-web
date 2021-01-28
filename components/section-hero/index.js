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
          for Redis<span className={styles.trademark}>®</span>
        </Title>

        <div className={styles.alt}>
          <Text size="large">
            Fast. Simple. Serverless.
          </Text>
        </div>

        <Button className={styles.cta} href="/" theme="primary">
          Get Started for Free
        </Button>
      </Container>
    </section>
  )
}

export default SectionHero
