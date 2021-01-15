import styles from './index.module.css'
// import { useContext } from 'react'
// import StoreContext from '../../store'
import Container from '../container'
import Stack from '../stack'
import SocialButton from '../social-button'
import { Col, Grid } from '../grid'
import { Text } from '../text'
import Link from '../link'
import Bg from '../bg'
import Logo from '../logo'

function Footer() {
  // const store = useContext(StoreContext)

  return (
    <footer className={styles.footer}>
      <Bg />

      <Container>
        <Stack gap={32} gapT={40}>
          {/* logo */}
          <div className={styles.logo}>
            <Logo />
          </div>

          {/* social */}
          <div className={styles.social}>
            <SocialButton name="twitter" />
            <SocialButton name="medium" />
            <SocialButton name="devto" />
            <SocialButton name="gitter" />
          </div>

          {/* links */}
          <div className={styles.links}>
            <Link external href="/">
              Contact Us
            </Link>
            <Link external href="/">
              Privacy Policy
            </Link>
            <Link external href="/">
              Terms of Service
            </Link>
            <Link external href="/">
              Subcontractors
            </Link>
          </div>

          <Grid col={1} col-t={6}>
            <Col span={1} span-t="2-5">
              <Text size="mini" color="textLight">
                * Redis is a trademark of Redis Labs Ltd. Any rights therein are
                reserved to Redis Labs Ltd. Any use by Upstash is for
                referential purposes only and does not indicate any sponsorship,
                endorsement or affiliation between Redis and Upstash.
              </Text>
            </Col>
          </Grid>

          {/*<div>*/}
          {/*  <Button*/}
          {/*    onClick={() =>*/}
          {/*      store.changeTheme(*/}
          {/*        store.theme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT*/}
          {/*      )*/}
          {/*    }*/}
          {/*  >*/}
          {/*    {store.theme === THEME.LIGHT ? 'Dark' : 'Light'}*/}
          {/*  </Button>*/}
          {/*</div>*/}
        </Stack>
      </Container>
    </footer>
  )
}

export default Footer
