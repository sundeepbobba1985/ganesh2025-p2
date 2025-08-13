import { NextResponse } from "next/server"

export async function GET() {
  try {
    const googleSheetsUrl =
      process.env.GOOGLE_SHEETS_URL ||
      "https://script.google.com/macros/s/AKfycbxVEpIMwrfKlyveAdvYuJ1U-o8WiAG3KC2of8pjL9gNq7KaHY68aksEnsoL8D9fXnLjLA/exec"

    const response = await fetch(`${googleSheetsUrl}?action=getExpenses`, {
      method: "GET",
    })

    const result = await response.json()

    return NextResponse.json({
      success: true,
      expenses: result.expenses || [],
    })
  } catch (error) {
    console.error("Error fetching expenses:", error)
    return NextResponse.json(
      {
        success: false,
        expenses: [],
        message: "Failed to fetch expenses",
      },
      { status: 500 },
    )
  }
}
