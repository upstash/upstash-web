import styles from './index.module.css'


import { Text } from '../text'

export function Input({ ...props }) {
  return <input className={styles.input} type="text" {...props} />
}

export function Label({ children, ...props }) {
  return (
    <Text tag="label" className={styles.label} {...props}>
      {children}
    </Text>
  )
}
