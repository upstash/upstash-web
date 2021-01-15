import cn from 'classnames'
import * as Icon from '../icons'
import Button from '../button'

import styles from './index.module.css'

function SocialButton({ name, href, children, className, ...props }) {
  return (
    <Button
      href={href}
      className={cn(styles.button, name && styles[name], className)}
      {...props}
    >
      {name === 'twitter' && <Icon.Twitter style={{ fontSize: 24 }} />}
      {name === 'gitter' && <Icon.Gitter style={{ fontSize: 24 }} />}
      {name === 'medium' && <Icon.Medium style={{ fontSize: 24 }} />}
      {name === 'devto' && <Icon.Devto style={{ fontSize: 24 }} />}
    </Button>
  )
}

export default SocialButton
