# Google Sheets Integration Setup

## Step 1: Create Google Apps Script

1. Open [Google Sheets](https://sheets.google.com) and create a new spreadsheet
2. Name it "Ganesh Chaturthi 2025 Registrations"
3. Go to **Extensions > Apps Script**
4. Delete the default `myFunction()` code
5. Paste the following code:

\`\`\`javascript
function doPost(e) {
  try {
    // Get the active sheet
    const sheet = SpreadsheetApp.getActiveSheet()
    const data = JSON.parse(e.postData.contents)

    // Add headers if this is the first row
    if (sheet.getLastRow() === 0) {
      sheet
        .getRange(1, 1, 1, 8)
        .setValues([["Timestamp", "Full Name", "Email", "Address", "Mobile", "Adults", "Kids", "Signed In"]])
    }

    // Add the registration data
    sheet.appendRow([
      data.timestamp,
      data.fullName,
      data.email,
      data.address,
      data.mobile,
      data.adults,
      data.kids,
      data.signedInUser,
    ])

    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON)
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON)
  }
}

function doGet(e) {
  try {
    const action = e.parameter.action
    
    if (action === 'getParticipants') {
      const sheet = SpreadsheetApp.getActiveSheet()
      const data = sheet.getDataRange().getValues()
      
      // Skip header row and extract participant data
      const participants = data.slice(1).map(row => ({
        name: row[1], // Full Name
        adults: parseInt(row[5]) || 0, // Adults
        kids: parseInt(row[6]) || 0, // Kids
        timestamp: row[0] // Timestamp
      }))
      
      return ContentService
        .createTextOutput(JSON.stringify({ success: true, participants: participants }))
        .setMimeType(ContentService.MimeType.JSON)
    }
    
    // Default response for unknown actions
    return ContentService
      .createTextOutput(JSON.stringify({ error: "Unknown action" }))
      .setMimeType(ContentService.MimeType.JSON)
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON)
  }
}
\`\`\`

## Step 2: Deploy as Web App

1. Click **Deploy > New deployment**
2. Choose **Web app** as the type
3. Set **Execute as**: Me
4. Set **Who has access**: Anyone
5. Click **Deploy**
6. **Copy the Web App URL** (it will look like: `https://script.google.com/macros/s/...../exec`)

## Step 3: Add Environment Variable

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add a new variable:
   - **Name**: `GOOGLE_SHEETS_URL`
   - **Value**: The Web App URL you copied in Step 2
4. Redeploy your application

## Step 4: Test the Integration

Once deployed, test the registration form on your website. Successful registrations will appear as new rows in your Google Sheet with all the form data and timestamps.

**New Feature**: The Participants section will now display all registered participants when accessed by signed-in users.

## Troubleshooting

- Make sure the Google Apps Script is deployed with "Anyone" access
- Verify the environment variable is set correctly in Vercel
- Check the Google Apps Script execution logs if registrations aren't appearing
- If participants aren't loading, ensure the Google Apps Script includes both `doPost` and `doGet` functions
