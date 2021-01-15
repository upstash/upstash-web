import Link from '../link'

import styles from './index.module.css'
import cn from 'classnames'

function Nav({ className }) {
  return (
    <nav className={cn(styles.nav, className)}>
      <Link className={styles.link} href="/">
        Pricing
      </Link>
      <Link external className={styles.link} href="https://docs.upstash.com/">
        Docs
      </Link>
      <Link
        external
        className={styles.link}
        href="https://medium.com/upstash"
      >
        Blog
      </Link>
    </nav>
  )
}

export default Nav
