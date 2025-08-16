export async function GET() {
  try {
    const GOOGLE_APPS_SCRIPT_URL =
      "https://script.google.com/macros/s/AKfycbwg9YCJJc1BUNzDI1vbCQ_8nP6XROAeK9KWtxtuhOnvwBbgKkLE_k71tpa8N4muobLcbA/exec"

    console.log("[v0] GET registrations - calling Google Apps Script")
    console.log("[v0] Using hardcoded URL:", GOOGLE_APPS_SCRIPT_URL)

    const url = `${GOOGLE_APPS_SCRIPT_URL}?action=getRegistrations`
    console.log("[v0] Full request URL:", url)

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
    })

    console.log("[v0] Response status:", response.status)
    console.log("[v0] Response headers:", Object.fromEntries(response.headers.entries()))

    if (!response.ok) {
      console.log(`[v0] Google Apps Script returned status ${response.status}, falling back to empty data`)
      return Response.json({
        success: true,
        registrations: [],
        fallback: true,
        message: "Google Sheets temporarily unavailable, showing empty data",
      })
    }

    const responseText = await response.text()
    console.log("[v0] Raw response length:", responseText.length)
    console.log("[v0] Raw response preview:", responseText.substring(0, 500))

    // Check if response is HTML (error page)
    if (responseText.includes("<html>") || responseText.includes("<!DOCTYPE")) {
      console.log("[v0] Received HTML response, falling back to empty data")
      return Response.json({
        success: true,
        registrations: [],
        fallback: true,
        message: "Google Sheets temporarily unavailable, showing empty data",
      })
    }

    const data = JSON.parse(responseText)
    console.log("[v0] Parsed data:", data)

    return Response.json({
      success: true,
      registrations: data.participants || [],
    })
  } catch (error) {
    console.error("[v0] Error fetching registrations:", error)
    return Response.json({
      success: true,
      registrations: [],
      fallback: true,
      message: "Google Sheets temporarily unavailable, showing empty data",
    })
  }
}
