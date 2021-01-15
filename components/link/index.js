import cn from 'classnames'
import * as Icon from '../icons'

import styles from './index.module.css'

function Link({
  href,
  external,
  children,
  className,
  primary = false,
  ...props
}) {
  return (
    <a
      href={href}
      className={cn(
        styles.link,
        external && styles.external,
        primary && styles.primary,
        className
      )}
      {...props}
    >
      {children}
      {external && <Icon.ArrowUpRight style={{ fontSize: 22 }} />}
    </a>
  )
}

export default Link
