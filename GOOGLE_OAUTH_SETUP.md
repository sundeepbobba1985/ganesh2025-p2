# Google OAuth Setup Instructions

To enable real Google Sign-In authentication, follow these steps:

## 1. Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing project
3. Enable the Google+ API and Google OAuth2 API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Set Application type to "Web application"
6. Add Authorized redirect URIs:
   - `http://localhost:3000` (for development)
   - `https://your-domain.vercel.app` (for production)

## 2. Environment Variables

Add these environment variables to your Vercel project:

\`\`\`env
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id_here
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
\`\`\`

## 3. Testing

- Development: OAuth will redirect to `http://localhost:3000`
- Production: OAuth will redirect to your Vercel domain

The authentication will now prompt users for real Google credentials and store their actual name and email address.
