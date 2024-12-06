import { NextResponse, type NextRequest } from "next/server"
import { geolocation } from "@vercel/functions"

// All EU/EEA countries with GDPR codes
// source: https://www.gdpradvisor.co.uk/gdpr-countries
const GDPR_COUNTRIES = new Set([
	"AT", // Austria
	"BE", // Belgium
	"BG", // Bulgaria
	"HR", // Croatia
	"CY", // Cyprus
	"CZ", // Czech Republic
	"DK", // Denmark
	"EE", // Estonia
	"FI", // Finland
	"FR", // France
	"DE", // Germany
	"GR", // Greece
	"HU", // Hungary
	"IS", // Iceland (EEA)
	"IE", // Ireland
	"IT", // Italy
	"LV", // Latvia
	"LI", // Liechtenstein (EEA)
	"LT", // Lithuania
	"LU", // Luxembourg
	"MT", // Malta
	"NO", // Norway (EEA)
	"NL", // Netherlands
	"PL", // Poland
	"PT", // Portugal
	"RO", // Romania
	"SK", // Slovakia
	"SI", // Slovenia
	"ES", // Spain
	"SE", // Sweden
])

export type GeolocationResponse = {
	country: string
	isEuropean: boolean
}
export const GET = (request: NextRequest) => {
	const { country = "US" } = geolocation(request)
	const isEuropean = GDPR_COUNTRIES.has(country)
	return NextResponse.json({ country, isEuropean })
}
