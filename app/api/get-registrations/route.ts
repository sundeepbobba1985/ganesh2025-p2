export async function GET() {
  try {
    const GOOGLE_SHEETS_URL =
      process.env.GOOGLE_SHEETS_URL ||
      "https://script.google.com/macros/s/AKfycbxVEpIMwrfKlyveAdvYuJ1U-o8WiAG3KC2of8pjL9gNq7KaHY68aksEnsoL8D9fXnLjLA/exec"

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
    console.log("Raw response text:", responseText)

    let data
    try {
      data = JSON.parse(responseText)
      console.log("Parsed registration data:", data)
    } catch (parseError) {
      console.error("JSON parse error:", parseError)
      console.error("Response was not valid JSON:", responseText)
      throw new Error("Invalid JSON response from Google Sheets")
    }

    const result = {
      success: true,
      registrations: data.participants || [],
    }

    console.log("Returning result:", result)
    console.log("=== END DEBUG ===")

    return Response.json(result)
  } catch (error) {
    console.error("=== ERROR IN GET REGISTRATIONS ===")
    console.error("Error details:", error)
    console.error("Error message:", error.message)
    console.error("Error stack:", error.stack)
    console.error("=== END ERROR ===")

    return Response.json(
      {
        success: false,
        error: `Failed to fetch registrations: ${error.message}`,
      },
      { status: 500 },
    )
  }
}
