import { NextResponse, type NextRequest } from "next/server"

export const GET = (request: NextRequest) => {
	const country = request.geo?.country ?? "US"
	const isEuropean = ["GB", "DE", "FR", "IT", "ES", "NL", "BE", "PL", "IE"].includes(country)


	return NextResponse.json({ country, isEuropean })
}
