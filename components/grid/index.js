import cn from 'classnames'

import styles from './index.module.css'

export function Grid({ children, className, ...props }) {
  return (
    // col="2" col-t="4"
    <div className={cn(styles.grid, className)} {...props}>
      {children}
    </div>
  )
}

export function Col({ children, className, ...props }) {
  return (
    // span="2" span-t="1"
    <div className={cn(styles.col, className)} {...props}>
      {children}
    </div>
  )
}
