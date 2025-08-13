import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const expenseData = {
      category: body.category,
      description: body.description,
      amount: body.amount,
      date: body.date,
      paidBy: body.paidBy,
      receipt: body.receipt || "",
      submittedBy: body.submittedBy,
      timestamp: body.timestamp,
    }

    // Send to Google Sheets
    const googleSheetsUrl =
      process.env.GOOGLE_SHEETS_URL ||
      "https://script.google.com/macros/s/AKfycbxVEpIMwrfKlyveAdvYuJ1U-o8WiAG3KC2of8pjL9gNq7KaHY68aksEnsoL8D9fXnLjLA/exec"

    const response = await fetch(googleSheetsUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "addExpense",
        data: expenseData,
      }),
    })

    const result = await response.text()

    return NextResponse.json({
      success: true,
      message: "Expense recorded successfully",
      result: result,
    })
  } catch (error) {
    console.error("Error submitting expense:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to record expense",
      },
      { status: 500 },
    )
  }
}
