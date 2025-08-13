import { NextResponse } from "next/server"

export async function GET() {
  try {
    const googleSheetsUrl =
      process.env.GOOGLE_SHEETS_URL ||
      "https://script.google.com/macros/s/AKfycbwoJts0cgZkCE2Zbl3jXEtnubG1v6O3KCGzveolK5lJYsmbvtLbkWOIEEq5g8Koqu8Jjw/exec"

    console.log("Fetching expenses from Google Sheets URL:", googleSheetsUrl)

    const requestUrl = `${googleSheetsUrl}?action=getExpenses`
    console.log("Full request URL:", requestUrl)

    const response = await fetch(requestUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })

    console.log("Google Sheets response status:", response.status)
    console.log("Google Sheets response headers:", Object.fromEntries(response.headers.entries()))

    if (!response.ok) {
      throw new Error(`Google Sheets API returned ${response.status}: ${response.statusText}`)
    }

    const responseText = await response.text()
    console.log("Google Sheets response text:", responseText)

    let result
    try {
      result = JSON.parse(responseText)
      console.log("Parsed Google Sheets response:", result)
    } catch (parseError) {
      console.error("Could not parse response as JSON:", parseError)
      throw new Error(`Invalid JSON response from Google Sheets: ${responseText}`)
    }

    return NextResponse.json({
      success: true,
      expenses: result.expenses || [],
      message: result.message || "Expenses fetched successfully",
    })
  } catch (error) {
    console.error("Error fetching expenses:", error)
    return NextResponse.json(
      {
        success: false,
        expenses: [],
        message: "Failed to fetch expenses",
        error: error.message,
      },
      { status: 500 },
    )
  }
}
