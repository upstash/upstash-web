import React, { createContext, useState } from 'react'

const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  const [dbUrl, dbUrlSet] = useState(process.env.NEXT_PUBLIC_CONSOLE_URL)

  return (
    <StoreContext.Provider value={{ dbUrl, dbUrlSet }}>
      {children}
    </StoreContext.Provider>
  )
}

export default StoreContext
