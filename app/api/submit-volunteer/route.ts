import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("[v0] Volunteer submission received:", body)

    const googleSheetsUrl =
      "https://script.google.com/macros/s/AKfycbwxWQxMNhBs5mLBCq5dvDqEh21iVEsZ9l8HWjnufKcvQ_PiyzWfEq9rBAqs_YM199eP3g/exec"

    const response = await fetch(googleSheetsUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "addVolunteer",
        ...body,
      }),
    })

    console.log("[v0] Google Sheets response status:", response.status)

    if (!response.ok) {
      throw new Error(`Google Sheets API error: ${response.status}`)
    }

    const result = await response.json()
    console.log("[v0] Google Sheets response:", result)

    return NextResponse.json({ success: true, message: "Volunteer registration submitted successfully" })
  } catch (error) {
    console.error("[v0] Error submitting volunteer registration:", error)
    return NextResponse.json({ success: false, error: "Failed to submit volunteer registration" }, { status: 500 })
  }
}
