import { Text } from '../text'
import * as Icon from '../icons'
import cn from 'classnames'

import styles from './table.module.css'

export function TableCol({
  className,
  children,
  check,
  first = false,
  last = false,
  bg = false
}) {
  return (
    <div
      className={cn(
        styles.col,
        bg && styles.colHighlight,
        first && styles.colHead,
        last && styles.colFooter,
        className
      )}
    >
      {children}
      {check === true && (
        <Icon.Check className={cn(styles.colIcon, styles.colIconCheck)} />
      )}
      {check === false && (
        <Icon.Minus className={cn(styles.colIcon, styles.colIconUnCheck)} />
      )}
    </div>
  )
}

export function TableColTitle({ children }) {
  return <Text className={styles.colTitle}>{children}</Text>
}
