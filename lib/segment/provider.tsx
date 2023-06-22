"use client"
import React, { useEffect, PropsWithChildren } from 'react'
import { Segment } from "./segment"

const segment = new Segment()

export const SegmentContext = React.createContext<Segment>(segment)


type Props = {
  writeKey: string
}
export const SegmentProvider: React.FC<PropsWithChildren<Props>> = ({ children, writeKey }) => {


  useEffect(() => {
    segment.load({ writeKey }).catch(err=>{
      console.warn(err)
    })
  }, [writeKey])

  return (
    <SegmentContext.Provider
      value={segment}
    >
      {children}
    </SegmentContext.Provider>
  )
}



