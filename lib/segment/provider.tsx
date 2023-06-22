"use client"
import React, { PropsWithChildren } from 'react'
import { AnalyticsBrowser} from '@segment/analytics-next'


export const SegmentContext = React.createContext<AnalyticsBrowser | null>(null)


type Props = {
  writeKey: string
}
export const SegmentProvider: React.FC<PropsWithChildren<Props>> = ({ children, writeKey }) => {

  const analytics = React.useMemo(() => {
    return AnalyticsBrowser.load({ writeKey })
  }, [writeKey])

  analytics.track("XXX").then(console.log)
  return (
    <SegmentContext.Provider
      value={analytics}
    >
      {children}
    </SegmentContext.Provider>
  )
}



