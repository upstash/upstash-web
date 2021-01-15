import React, { useState } from 'react'
import Header from '../header'
import NavMobile from '../nav-mobile'
import Footer from '../footer'

import styles from './index.module.css'

function Layout({ children }) {
  const [menuVisible, menuVisibleSet] = useState(false)

  const toggleMenu = () => {
    menuVisibleSet(!menuVisible)
  }

  return (
    <div>
      <Header toggleMenu={toggleMenu} />
      {menuVisible && <NavMobile toggleMenu={toggleMenu} />}
      <main className={menuVisible ? styles.menuActive : undefined}>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
