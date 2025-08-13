export async function GET() {
  try {
    const GOOGLE_SHEETS_URL =
      process.env.GOOGLE_SHEETS_URL ||
      "https://script.google.com/macros/s/AKfycbxVEpIMwrfKlyveAdvYuJ1U-o8WiAG3KC2of8pjL9gNq7KaHY68aksEnsoL8D9fXnLjLA/exec"

    const response = await fetch(`${GOOGLE_SHEETS_URL}?action=getParticipants`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    return Response.json({
      success: true,
      participants: data.participants || [],
    })
  } catch (error) {
    console.error("Error fetching participants:", error)
    return Response.json({ success: false, error: "Failed to fetch participants" }, { status: 500 })
  }
}
