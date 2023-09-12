'use client'

import { useEffect, useMemo } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { segment } from "@/lib/segment/segment"
export const SEGMENT_WRITE_KEY = process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY? process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY : ""


export const Analytics = () =>{
	const pathname = usePathname()
	const searchParams = useSearchParams()

	useEffect(()=>{
		segment.page()
	}, [pathname, searchParams])

	return null
}

