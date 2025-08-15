import { NextResponse } from "next/server"

export async function GET() {
  try {
    const FOLDER_ID = "12flkHyZcjaquQ0qLY8KgY7LEIZEP2Krf"
    const API_KEY = process.env.GOOGLE_DRIVE_API_KEY

    if (!API_KEY) {
      return NextResponse.json({
        success: false,
        error: "Google Drive API key not configured",
      })
    }

    // Fetch files from Google Drive folder
    const response = await fetch(
      `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents+and+mimeType+contains+'image/'&key=${API_KEY}&fields=files(id,name,webViewLink,thumbnailLink,createdTime)`,
    )

    if (!response.ok) {
      throw new Error(`Google Drive API error: ${response.status}`)
    }

    const data = await response.json()

    // Transform the data for gallery use
    const images =
      data.files?.map((file: any) => ({
        id: file.id,
        src: `https://drive.google.com/uc?id=${file.id}`,
        alt: file.name,
        caption: file.name.replace(/\.[^/.]+$/, ""), // Remove file extension
        createdTime: file.createdTime,
      })) || []

    // Sort by creation time (newest first)
    images.sort((a: any, b: any) => new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime())

    return NextResponse.json({
      success: true,
      images: images,
    })
  } catch (error) {
    console.error("Error fetching Google Drive images:", error)
    return NextResponse.json({
      success: false,
      error: "Failed to fetch images from Google Drive",
    })
  }
}
