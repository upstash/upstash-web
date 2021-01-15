import cn from 'classnames'
import * as Icon from '../icons'

import styles from './box.module.css'

function SupportBox({ href = '/', theme, children, className, ...props }) {
  return (
    <a
      href={href}
      className={cn(styles.box, styles[theme], className)}
      {...props}
    >
      {children}
      <Icon.ArrowUpRight style={{ fontSize: 24 }} />
    </a>
  )
}

export default SupportBox
