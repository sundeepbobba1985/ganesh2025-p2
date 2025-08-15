export async function GET() {
  try {
    const GOOGLE_APPS_SCRIPT_URL =
      "https://script.google.com/macros/s/AKfycbzHiHzuOoJHAXNIbmoV0la6w_QuReee30TfScLeONQhf4RW5J53z3RfStxndUI_83J83A/exec"

    console.log("[v0] Fetching participants from:", GOOGLE_APPS_SCRIPT_URL)

    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        action: "getRegistrations",
      }),
      redirect: "follow", // Follow redirects automatically
    })

    console.log("[v0] Response status:", response.status)
    console.log("[v0] Response URL:", response.url)

    if (!response.ok) {
      const errorText = await response.text()
      console.log("[v0] Error response:", errorText.substring(0, 500))
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const responseText = await response.text()
    console.log("[v0] Raw response:", responseText.substring(0, 200))

    if (responseText.includes("<html>") || responseText.includes("<!DOCTYPE")) {
      throw new Error(
        "Google Apps Script returned HTML error page. Check your script deployment settings - it should be deployed as 'Anyone' can access.",
      )
    }

    const data = JSON.parse(responseText)
    console.log("[v0] Registration data received:", data)

    const participants =
      data.registrations?.map((reg) => ({
        name: reg.name,
        email: reg.email,
        adults: Number.parseInt(reg.adults) || 0,
        kids: Number.parseInt(reg.kids) || 0,
        timestamp: reg.timestamp,
      })) || []

    return Response.json({
      success: true,
      participants: participants,
    })
  } catch (error) {
    console.error("[v0] Error fetching participants:", error)
    return Response.json(
      {
        success: false,
        error: "Failed to fetch participants",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
