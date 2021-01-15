import cn from 'classnames'

import styles from './index.module.css'

function Bg({ className, ...props }) {
  return <div className={cn(styles.bg, className)} {...props} />
}

export default Bg
