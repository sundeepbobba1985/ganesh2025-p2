import { type NextRequest, NextResponse } from "next/server"
import { writeFile, readFile, mkdir } from "fs/promises"
import { existsSync } from "fs"
import path from "path"

const DATA_DIR = path.join(process.cwd(), "data")
const PARTICIPANTS_FILE = path.join(DATA_DIR, "participants.json")

// Ensure data directory exists
async function ensureDataDir() {
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true })
  }
}

// Read participants from JSON file
async function readParticipants() {
  try {
    await ensureDataDir()
    if (!existsSync(PARTICIPANTS_FILE)) {
      return []
    }
    const data = await readFile(PARTICIPANTS_FILE, "utf-8")
    return JSON.parse(data)
  } catch (error) {
    console.error("Error reading participants:", error)
    return []
  }
}

// Write participants to JSON file
async function writeParticipants(participants: any[]) {
  try {
    await ensureDataDir()
    await writeFile(PARTICIPANTS_FILE, JSON.stringify(participants, null, 2))
    return true
  } catch (error) {
    console.error("Error writing participants:", error)
    return false
  }
}

// GET - Retrieve all participants
export async function GET() {
  try {
    const participants = await readParticipants()

    // Calculate dashboard stats
    const stats = participants.reduce(
      (acc: any, participant: any) => {
        acc.totalFamilies += 1
        acc.totalAdults += Number.parseInt(participant.adults) || 0
        acc.totalKids += Number.parseInt(participant.kids) || 0
        return acc
      },
      { totalFamilies: 0, totalAdults: 0, totalKids: 0 },
    )

    return NextResponse.json({
      success: true,
      participants,
      stats,
    })
  } catch (error) {
    console.error("Error in GET participants:", error)
    return NextResponse.json({ success: false, error: "Failed to retrieve participants" }, { status: 500 })
  }
}

// POST - Add new participant
export async function POST(request: NextRequest) {
  try {
    const newParticipant = await request.json()

    // Add timestamp and ID
    const participant = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      ...newParticipant,
    }

    const participants = await readParticipants()
    participants.push(participant)

    const success = await writeParticipants(participants)

    if (success) {
      return NextResponse.json({ success: true, participant })
    } else {
      throw new Error("Failed to save participant")
    }
  } catch (error) {
    console.error("Error in POST participants:", error)
    return NextResponse.json({ success: false, error: "Failed to add participant" }, { status: 500 })
  }
}
