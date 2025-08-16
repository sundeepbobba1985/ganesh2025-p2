export async function GET() {
  try {
    const GOOGLE_APPS_SCRIPT_URL =
      "https://script.google.com/macros/s/AKfycbwg9YCJJc1BUNzDI1vbCQ_8nP6XROAeK9KWtxtuhOnvwBbgKkLE_k71tpa8N4muobLcbA/exec"

    console.log("[v0] GET registrations - calling Google Apps Script")
    console.log("[v0] Using URL:", GOOGLE_APPS_SCRIPT_URL)

    const response = await fetch(`${GOOGLE_APPS_SCRIPT_URL}?action=getRegistrations`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow", // Handle 302 redirects automatically
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const responseText = await response.text()
    console.log("[v0] Raw response:", responseText.substring(0, 200))

    // Check if response is HTML (error page)
    if (responseText.includes("<html>") || responseText.includes("<!DOCTYPE")) {
      throw new Error("Received HTML response instead of JSON - likely a Google Apps Script error")
    }

    const data = JSON.parse(responseText)
    console.log("[v0] Parsed data:", data)

    return Response.json({
      success: true,
      registrations: data.participants || [],
    })
  } catch (error) {
    console.error("[v0] Error fetching registrations:", error)
    return Response.json(
      {
        success: false,
        error: error.message,
        registrations: [],
      },
      { status: 500 },
    )
  }
}
