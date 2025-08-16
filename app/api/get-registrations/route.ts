export async function GET() {
  try {
    const GOOGLE_SHEETS_URL =
      process.env.GOOGLE_SHEETS_URL ||
      "https://script.google.com/macros/s/AKfycbzI67WXxPvW7NS8Jne_ZWgswDBaYyCep9J3_K-Q3Hssu4jP7sA6KGmC64wMOotD28S8Gw/exec"

    console.log("=== GET REGISTRATIONS DEBUG ===")
    console.log("Using Google Sheets URL:", GOOGLE_SHEETS_URL)
    console.log("Environment GOOGLE_SHEETS_URL:", process.env.GOOGLE_SHEETS_URL)

    const requestUrl = `${GOOGLE_SHEETS_URL}?action=getParticipants`
    console.log("Full request URL:", requestUrl)

    const response = await fetch(requestUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    console.log("Response status:", response.status)
    console.log("Response headers:", Object.fromEntries(response.headers.entries()))

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Response error text:", errorText)
      throw new Error(`HTTP error! status: ${response.status}, text: ${errorText}`)
    }

    const responseText = await response.text()
    console.log("Raw response (first 500 chars):", responseText.substring(0, 500))

    if (responseText.includes("<html>") || responseText.includes("<!DOCTYPE")) {
      console.error("Received HTML response instead of JSON - likely a Google Apps Script error")
      console.error("Full HTML response:", responseText)
      throw new Error(
        "Google Apps Script returned HTML error page instead of JSON. Check your script deployment and doGet function.",
      )
    }

    let data
    try {
      data = JSON.parse(responseText)
      console.log("Successfully parsed JSON:", data)
    } catch (parseError) {
      console.error("JSON parse error:", parseError)
      console.error("Response was not valid JSON:", responseText)
      throw new Error(`Invalid JSON response from Google Sheets: ${responseText.substring(0, 200)}...`)
    }

    if (!data.success && data.error) {
      console.error("Google Apps Script returned error:", data.error)
      throw new Error(`Google Apps Script error: ${data.error}`)
    }

    const result = {
      success: true,
      registrations: data.participants || [],
    }

    console.log("Returning result with", result.registrations.length, "participants")
    return Response.json(result)
  } catch (error) {
    console.error("=== ERROR IN GET REGISTRATIONS ===")
    console.error("Error:", error.message)
    return Response.json(
      {
        success: false,
        error: `Failed to fetch registrations: ${error.message}`,
      },
      { status: 500 },
    )
  }
}
