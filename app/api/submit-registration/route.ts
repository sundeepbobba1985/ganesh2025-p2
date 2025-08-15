import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    console.log("[v0] Registration submission received:", data)

    // Google Sheets Web App URL - you'll need to replace this with your actual URL
    const GOOGLE_SHEETS_URL =
      process.env.GOOGLE_SHEETS_URL ||
      "https://script.google.com/macros/s/AKfycbzhxDSSVgCEW0I7q9Ui7-w_z2_POP6SVaXqM6PGbWPbS3XgDUmjJLTal0jLZzBQwl6G/exec"

    const requestPayload = {
      action: "submitRegistration",
      fullName: data.fullName,
      email: data.email,
      address: data.address,
      mobile: data.mobile,
      adults: data.adults,
      kids: data.kids,
      timestamp: data.timestamp,
      signedInUser: data.signedInUser,
    }

    console.log("[v0] Sending registration to Google Sheets:", requestPayload)

    // Send data to Google Sheets
    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestPayload),
    })

    console.log("[v0] Google Sheets response status:", response.status)
    const result = await response.text()
    console.log("[v0] Google Sheets response:", result)

    if (response.ok) {
      return NextResponse.json({ success: true })
    } else {
      throw new Error("Failed to submit to Google Sheets")
    }
  } catch (error) {
    console.error("[v0] Registration API Error:", error)
    return NextResponse.json({ error: "Failed to submit registration" }, { status: 500 })
  }
}
