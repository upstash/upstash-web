import cn from 'classnames'

import styles from './index.module.css'

function Stack({ gap = 0, gapT, children, className, style, ...props }) {
  return (
    <div
      className={cn(styles.stack, className)}
      style={{
        '--gap': gap > 0 ? `${gap}px` : `${gap}px`,
        '--gap-t': gapT > 0 ? `${gapT}px` : `${gap}px`,
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  )
}
export default Stack
