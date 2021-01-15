import { Title, Text } from '../text'

import styles from './header.module.css'

function SectionDemoHeader({ number, title, desc }) {
  return (
    <header className={styles.header}>
      <div className={styles.number}>{number}</div>
      <Title tag="h4" className={styles.title}>
        {title}
      </Title>
      {desc && (
        <Text size="large" color="textLight" className={styles.desc}>
          {desc}
        </Text>
      )}
    </header>
  )
}

export default SectionDemoHeader
