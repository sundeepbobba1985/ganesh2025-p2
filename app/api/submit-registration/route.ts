import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Google Sheets Web App URL - you'll need to replace this with your actual URL
    const GOOGLE_SHEETS_URL =
      process.env.GOOGLE_SHEETS_URL ||
      "https://script.google.com/macros/s/AKfycbzhxDSSVgCEW0I7q9Ui7-w_z2_POP6SVaXqM6PGbWPbS3XgDUmjJLTal0jLZzBQwl6G/exec"

    // Send data to Google Sheets
    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: data.fullName,
        email: data.email,
        address: data.address,
        mobile: data.mobile,
        adults: data.adults,
        kids: data.kids,
        timestamp: data.timestamp,
        signedInUser: data.signedInUser,
      }),
    })

    if (response.ok) {
      return NextResponse.json({ success: true })
    } else {
      throw new Error("Failed to submit to Google Sheets")
    }
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Failed to submit registration" }, { status: 500 })
  }
}
