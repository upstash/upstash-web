import cn from 'classnames'

import styles from './index.module.css'

export function Title({ tag = 'h4', color, children, className, ...props }) {
  const CustomTag = tag
  return (
    <CustomTag
      className={cn(
        styles[tag],
        tag === 'h1' && styles[`fw-black`],
        tag === 'h2' && styles[`fw-bold`],
        tag === 'h4' && styles[`fw-medium`],
        styles[`fs-${tag}`],
        color && styles[`c-${color}`],
        className
      )}
      {...props}
    >
      {children}
    </CustomTag>
  )
}

export function Text({
  tag = 'p',
  weight,
  size,
  color,
  className,
  children,
  ...props
}) {
  const CustomTag = tag

  return (
    <CustomTag
      className={cn(
        weight && styles[`fw-${weight}`],
        size && styles[`fs-${size}`],
        color && styles[`c-${color}`],
        className
      )}
      {...props}
    >
      {children}
    </CustomTag>
  )
}
