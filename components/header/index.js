import styles from './index.module.css'
import Container from '../container'
import { Col, Grid } from '../grid'
import Nav from '../nav'
import * as Icon from '../icons'
import Logo from '../logo'
import Link from '../link'

function Header({ toggleMenu = () => {} }) {
  return (
    <header className={styles.header}>
      <Container>
        <Grid col={2} col-t={4}>
          {/* logo */}
          <Col span={1} className={styles.logo}>
            <Logo />
          </Col>

          {/* nav */}
          <Col span={2} className={styles.nav}>
            <Nav />
          </Col>

          {/* console */}
          <Col span={1} className={styles.console}>
            <Link external href="https://console.upstash.com">
              Console
            </Link>
          </Col>

          {/* mobile */}
          <Col span-t={1} className={styles.switch}>
            <button className={styles.switchButton} onClick={toggleMenu}>
              <Icon.Menu style={{ fontSize: 24 }} />
            </button>
          </Col>
        </Grid>
      </Container>
    </header>
  )
}

export default Header
