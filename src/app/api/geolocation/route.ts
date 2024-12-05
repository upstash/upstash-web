import { NextResponse, type NextRequest } from "next/server"
import { geolocation } from "@vercel/functions"

export const GET = (request: NextRequest) => {
	const { country = "US" } = geolocation(request)
	const isEuropean = ["GB", "DE", "FR", "IT", "ES", "NL", "BE", "PL", "IE"].includes(country)


	return NextResponse.json({ country, isEuropean })
}
