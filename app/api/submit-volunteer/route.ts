import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("[v0] Volunteer submission received:", body)

    const googleSheetsUrl =
      "https://script.google.com/macros/s/AKfycbwxWQxMNhBs5mLBCq5dvDqEh21iVEsZ9l8HWjnufKcvQ_PiyzWfEq9rBAqs_YM199eP3g/exec"

    console.log("[v0] Sending volunteer data to Google Apps Script:", {
      url: googleSheetsUrl,
      action: "addVolunteer",
      data: body,
    })

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
    console.log("[v0] Google Sheets response headers:", Object.fromEntries(response.headers.entries()))

    const responseText = await response.text()
    console.log("[v0] Google Sheets raw response:", responseText)

    if (!response.ok) {
      console.error("[v0] Google Sheets API error - Status:", response.status, "Response:", responseText)
      throw new Error(`Google Sheets API error: ${response.status} - ${responseText}`)
    }

    let result
    try {
      result = JSON.parse(responseText)
      console.log("[v0] Google Sheets parsed response:", result)
    } catch (parseError) {
      console.error("[v0] Failed to parse Google Sheets response as JSON:", parseError)
      console.log("[v0] Response was:", responseText)
      throw new Error("Invalid JSON response from Google Apps Script")
    }

    if (result.success) {
      console.log("[v0] Volunteer successfully added to Google Sheets")
    } else {
      console.error("[v0] Google Apps Script returned failure:", result)
    }

    return NextResponse.json({ success: true, message: "Volunteer registration submitted successfully" })
  } catch (error) {
    console.error("[v0] Error submitting volunteer registration:", error)
    return NextResponse.json({ success: false, error: "Failed to submit volunteer registration" }, { status: 500 })
  }
}
