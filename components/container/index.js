import cn from 'classnames'

import styles from './index.module.css'

function Container({ children, className, ...props }) {
  return (
    <div className={cn(styles.container, className)} {...props}>
      {children}
    </div>
  )
}

export default Container
