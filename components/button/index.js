import cn from 'classnames'

import styles from './index.module.css'

function Button({
  href,
  isLoading = false,
  disabled = false,
  children,
  theme = 'normal',
  className,
  ...props
}) {
  return href ? (
    <a
      href={href}
      className={cn(styles.button, styles[theme], className)}
      {...props}
    >
      {children}
    </a>
  ) : (
    <button
      type="button"
      className={cn(styles.button, styles[theme], className)}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <img src="/three-dots.svg" width={42} alt="loading" />
      ) : (
        children
      )}
    </button>
  )
}

export default Button
