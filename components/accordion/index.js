import React, { useState } from 'react'
import cn from 'classnames'
import Stack from '../stack'

import styles from './index.module.css'

export function Accordion({ children, className, defaultActiveKey = 0 }) {
  const [activeIndex, activeIndexSet] = useState(defaultActiveKey)

  const change = (index) => {
    activeIndexSet(index)
  }

  const childs = React.Children.map(children, (child, index) =>
    React.cloneElement(child, {
      ...child.props,
      isActive: index === activeIndex,
      index,
      activeIndex,
      change
    })
  )

  return <div className={cn(styles.accordion, className)}>{childs}</div>
}

Accordion.Item = function ({ isActive, index, change, children, className }) {
  return (
    <Stack
      gap={16}
      onClick={() => change(index)}
      className={cn(styles.item, isActive && styles.active, className)}
    >
      {children}
    </Stack>
  )
}

Accordion.Header = function ({ children, className }) {
  return <div className={cn(styles.header, className)}>{children}</div>
}

Accordion.Collapse = function ({ children, className }) {
  return (
    <div className={cn(styles.collapse, 'collapse', className)}>
      <Stack gap={16}>{children}</Stack>
    </div>
  )
}

export default Accordion
