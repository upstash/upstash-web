import cn from 'classnames'
import Container from '../container'
import Bg from '../bg'
import Header from './header'
import Stack from '../stack'
import Step1 from './step-1'
import Step2 from './step-2'
import Step3 from './step-3'

import styles from './index.module.css'

function SectionDemo({ children, className, ...props }) {
  return (
    <section className={cn(styles.section, className)} {...props}>
      <Bg className={styles.bg} />
      <Container>
        <Stack gap={80} gapT={120}>
          <div>
            <Stack gap={40} gapT={60}>
              <Header
                number="1"
                title="Create"
                desc="Create your serverless database in seconds."
              />
              <Step1 />
            </Stack>
          </div>

          <div>
            <Stack gap={40} gapT={60}>
              <Header
                number="2"
                title="Connect"
                desc="Only pay for successful transactions."
              />
              <Step2 />
            </Stack>
          </div>

          {/*<div>*/}
          {/*  <Header number="3" title="And More" />*/}
          {/*  <Step3 />*/}
          {/*</div>*/}
        </Stack>
      </Container>
    </section>
  )
}

export default SectionDemo
