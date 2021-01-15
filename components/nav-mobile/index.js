import Nav from '../nav'
import * as Icon from '../icons'
import Button from '../button'

import styles from './index.module.css'

function NavMobile({ toggleMenu = () => {} }) {
  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <a href="/">UpStash</a>

        <Button className={styles.switchButton} onClick={toggleMenu}>
          <Icon.X style={{ fontSize: 24 }} />
        </Button>
      </div>

      <div className={styles.menu}>
        <Button href="https://console.upstash.com">Console</Button>
        <Nav className={styles.nav} />
      </div>
    </div>
  )
}

export default NavMobile
