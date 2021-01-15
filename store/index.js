import { createContext, useEffect, useState } from 'react'

const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  // const [theme, themeSet] = useState(null)

  // const changeTheme = (theme) => {}

  return <StoreContext.Provider value={{}}>{children}</StoreContext.Provider>
}

export default StoreContext
