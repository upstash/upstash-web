'use client'

import { useEffect, useMemo } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { Segment } from "@/lib/segment/segment"
export const SEGMENT_WRITE_KEY = process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY? process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY : ""

export let segment: Segment

export const Analytics = () =>{
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const segment = useMemo(() => {
    const segment = new Segment()
    segment.load(SEGMENT_WRITE_KEY).catch(err => {
      console.warn(err)
    })
    return segment
  }, [SEGMENT_WRITE_KEY])

	useEffect(()=>{
		segment.page()
	}, [pathname, searchParams])

	return null
}

