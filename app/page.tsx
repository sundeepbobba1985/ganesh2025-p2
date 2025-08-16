"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Calendar, HomeIcon, Lock, HelpCircle, User, DollarSign, Trophy, Search, Heart, Users } from "lucide-react"

export default function PVGaneshaClone() {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [userInfo, setUserInfo] = useState<{ name: string; email: string } | null>(null)
  const [showRegistrationForm, setShowRegistrationForm] = useState(false)
  const [showParticipants, setShowParticipants] = useState(false)
  const [participants, setParticipants] = useState([])
  const [loadingParticipants, setLoadingParticipants] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    mobile: "",
    adults: "",
    kids: "",
    zelleConfirmation: "",
  })

  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const [showFinancials, setShowFinancials] = useState(false)
  const [showExpenseForm, setShowExpenseForm] = useState(false)
  const [expenses, setExpenses] = useState([])
  const [loadingExpenses, setLoadingExpenses] = useState(false)
  const [expenseFormData, setExpenseFormData] = useState({
    category: "",
    description: "",
    amount: "",
    date: "",
    paidBy: "",
    receipt: "",
  })

  const [volunteerForm, setVolunteerForm] = useState({
    name: "",
    email: "",
    volunteerType: "",
    cleanupDate: "",
  })

  const [volunteerCounts, setVolunteerCounts] = useState({
    "Prasadam Morning": 0,
    "Prasadam Evening": 0,
  })

  const [adminEmails] = useState([
    "admin1@gmail.com", // Replace with actual admin emails
    "admin2@gmail.com",
    "admin3@gmail.com",
    "SUNDEEPBOBBA@GMAIL.COM", // Added user's email for admin access
    "sundeepbobba@gmail.com", // Added lowercase version as well
  ])
  const [eventBudget, setEventBudget] = useState(2250) // Default budget
  const [showBudgetConfig, setShowBudgetConfig] = useState(false)
  const [newBudget, setNewBudget] = useState("")
  const [participantsLoading, setParticipantsLoading] = useState(false)
  const [participantsError, setParticipantsError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [showGallery, setShowGallery] = useState(false)
  const [newImageUrl, setNewImageUrl] = useState("")
  const [newImageCaption, setNewImageCaption] = useState("")
  const [galleryImages, setGalleryImages] = useState<any[]>([])
  const [showAddImages, setShowAddImages] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [dashboardStats, setDashboardStats] = useState({
    totalFamilies: 0,
    totalAdults: 0,
    totalKids: 0,
  })

  const [showVolunteerModal, setShowVolunteerModal] = useState(false)

  const [visitorCount, setVisitorCount] = useState<number>(0)

  const loadDashboardStats = async () => {
    try {
      console.log("[v0] Loading dashboard stats from Google Sheets...")

      // Try to load from Google Sheets first for consistent data across all users
      try {
        const response = await fetch("/api/get-registrations")
        if (response.ok) {
          const data = await response.json()
          if (data.success && data.participants && data.participants.length > 0) {
            const totalFamilies = data.participants.length
            const totalAdults = data.participants.reduce((sum: number, p: any) => sum + Number(p.adults || 0), 0)
            const totalKids = data.participants.reduce((sum: number, p: any) => sum + Number(p.kids || 0), 0)

            const stats = { totalFamilies, totalAdults, totalKids }
            setDashboardStats(stats)
            console.log("[v0] Dashboard stats loaded from Google Sheets:", stats)

            const registrations = data.participants.map((p: any, index: number) => ({
              id: index + 1,
              familyName: p.familyName || p.contactPerson,
              adults: Number(p.adults || 0),
              kids: Number(p.kids || 0),
              timestamp: p.timestamp || new Date().toISOString(),
              ...p,
            }))
            localStorage.setItem("pv-ganesha-registrations", JSON.stringify(registrations))
            localStorage.setItem("pv-ganesha-stats-version", "google-sheets-sync")
            return // Ensure early return to prevent localStorage fallback
          }
        }
      } catch (error) {
        console.log("[v0] Google Sheets unavailable, using fallback...")
      }

      // Fallback to localStorage with consistent initial values
      console.log("[v0] Loading dashboard stats from local storage...")
      const currentVersion = "v5-correct-stats"
      const storedVersion = localStorage.getItem("pv-ganesha-stats-version")

      if (storedVersion !== currentVersion && storedVersion !== "google-sheets-sync") {
        console.log("[v0] Version mismatch, resetting to correct initial statistics...")
        localStorage.removeItem("pv-ganesha-registrations")
        localStorage.setItem("pv-ganesha-stats-version", currentVersion)
      }

      const localData = localStorage.getItem("pv-ganesha-registrations")

      if (localData) {
        const registrations = JSON.parse(localData)
        const totalFamilies = registrations.length
        const totalAdults = registrations.reduce((sum: number, r: any) => sum + Number(r.adults || 0), 0)
        const totalKids = registrations.reduce((sum: number, r: any) => sum + Number(r.kids || 0), 0)

        const stats = { totalFamilies, totalAdults, totalKids }
        setDashboardStats(stats)
        console.log("[v0] Dashboard stats loaded from local storage:", stats)
        return
      }

      console.log("[v0] No local data found, setting initial statistics...")
      const initialRegistrations = [
        { id: 1, familyName: "Initial Family 1", adults: 3, kids: 2, timestamp: new Date().toISOString() },
        { id: 2, familyName: "Initial Family 2", adults: 2, kids: 2, timestamp: new Date().toISOString() },
        { id: 3, familyName: "Initial Family 3", adults: 3, kids: 2, timestamp: new Date().toISOString() },
        { id: 4, familyName: "Initial Family 4", adults: 2, kids: 2, timestamp: new Date().toISOString() },
      ]

      localStorage.setItem("pv-ganesha-registrations", JSON.stringify(initialRegistrations))
      const stats = { totalFamilies: 4, totalAdults: 10, totalKids: 8 }
      setDashboardStats(stats)
      console.log("[v0] Initial dashboard stats set:", stats)
    } catch (error) {
      console.error("[v0] Error loading dashboard stats:", error)
      setDashboardStats({ totalFamilies: 4, totalAdults: 10, totalKids: 8 })
    }
  }

  useEffect(() => {
    loadDashboardStats() // Load dashboard stats instead of resetting
    loadFinancials()

    const initVisitorCounter = () => {
      const currentCount = localStorage.getItem("pv-ganesha-visitor-count")
      if (currentCount) {
        const count = Number.parseInt(currentCount, 10)
        setVisitorCount(count)
      } else {
        // First time visitor
        const newCount = 1
        localStorage.setItem("pv-ganesha-visitor-count", newCount.toString())
        setVisitorCount(newCount)
      }

      // Increment count for returning visitors (but only once per session)
      const sessionVisited = sessionStorage.getItem("pv-ganesha-session-visited")
      if (!sessionVisited) {
        const updatedCount = Number.parseInt(localStorage.getItem("pv-ganesha-visitor-count") || "0", 10) + 1
        localStorage.setItem("pv-ganesha-visitor-count", updatedCount.toString())
        sessionStorage.setItem("pv-ganesha-session-visited", "true")
        setVisitorCount(updatedCount)
      }
    }

    initVisitorCounter()
  }, [])

  const saveRegistrationToLocalStorage = (registrationData: any) => {
    try {
      const existingData = localStorage.getItem("pv-ganesha-registrations")
      const registrations = existingData ? JSON.parse(existingData) : []

      const newRegistration = {
        id: Date.now(),
        familyName: registrationData.fullName,
        adults: Number(registrationData.adults) || 0,
        kids: Number(registrationData.kids) || 0,
        timestamp: new Date().toISOString(),
        ...registrationData,
      }

      registrations.push(newRegistration)
      localStorage.setItem("pv-ganesha-registrations", JSON.stringify(registrations))
      console.log("[v0] Registration saved to local storage:", newRegistration)
    } catch (error) {
      console.error("[v0] Error saving to local storage:", error)
    }
  }

  const handleGallerySection = () => {
    setShowGallery(true)
  }

  const isAdmin = () => {
    return userInfo?.email && adminEmails.includes(userInfo.email)
  }

  const handleAddImage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newImageUrl.trim() && newImageCaption.trim()) {
      const newImage = {
        url: newImageUrl.trim(),
        caption: newImageCaption.trim(),
      }
      setGalleryImages([...galleryImages, newImage])
      setNewImageUrl("")
      setNewImageCaption("")
      setShowAddImages(false)
      alert("Image added successfully!")
    }
  }

  const handleRemoveImage = (index: number) => {
    if (confirm("Are you sure you want to remove this image?")) {
      const updatedImages = galleryImages.filter((_, i) => i !== index)
      setGalleryImages(updatedImages)
      if (currentImageIndex >= updatedImages.length) {
        setCurrentImageIndex(Math.max(0, updatedImages.length - 1))
      }
    }
  }

  const handleGoogleSignIn = () => {
    if (!isSignedIn) {
      const clientId =
        process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "1234567890-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com"
      const redirectUri = `${window.location.origin}/api/auth/google`
      const scope = "openid email profile"

      console.log("=== OAUTH DEBUG INFO ===")
      console.log("Environment GOOGLE_CLIENT_ID:", process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID)
      console.log("Using Client ID:", clientId)
      console.log("Redirect URI:", redirectUri)
      console.log("Current Origin:", window.location.origin)

      // Check if using fallback client ID
      if (clientId === "1234567890-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com") {
        console.error(
          "⚠️ WARNING: Using fallback client ID! Set NEXT_PUBLIC_GOOGLE_CLIENT_ID in Vercel environment variables",
        )
        alert(
          "OAuth not configured! Please set NEXT_PUBLIC_GOOGLE_CLIENT_ID environment variable in Vercel Project Settings.",
        )
        return
      }

      const googleAuthUrl =
        `https://accounts.google.com/o/oauth2/v2/auth?` +
        `client_id=${clientId}&` +
        `redirect_uri=${encodeURIComponent(redirectUri)}&` +
        `scope=${encodeURIComponent(scope)}&` +
        `response_type=code&` +
        `access_type=offline&` +
        `prompt=consent`

      console.log("Full OAuth URL:", googleAuthUrl)
      console.log("========================")

      // Store current page state
      localStorage.setItem("preAuthUrl", window.location.href)

      // Redirect to Google OAuth
      window.location.href = googleAuthUrl
    } else {
      // Sign out
      setIsSignedIn(false)
      setUserInfo(null)
      localStorage.removeItem("googleAccessToken")
      localStorage.removeItem("userInfo")
    }
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const name = urlParams.get("name")
    const email = urlParams.get("email")
    const authenticated = urlParams.get("authenticated")
    const error = urlParams.get("error")

    if (error) {
      console.error("OAuth error:", error)
      alert("Authentication failed. Please try again.")
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname)
    } else if (authenticated === "true" && name && email) {
      // Set user info from URL parameters
      setUserInfo({ name, email })
      setIsSignedIn(true)

      // Store in localStorage for persistence
      localStorage.setItem("userInfo", JSON.stringify({ name, email }))

      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname)
    } else {
      // Restore previous authentication state
      const savedUserInfo = localStorage.getItem("userInfo")

      if (savedUserInfo) {
        setUserInfo(JSON.parse(savedUserInfo))
        setIsSignedIn(true)
      }
    }
  }, [])

  const handleOAuthCallback = async (code: string) => {
    try {
      // In a real implementation, you'd exchange the code for an access token on your backend
      // For now, we'll use Google's userinfo endpoint directly
      const response = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      })

      if (response.ok) {
        const userData = await response.json()
        setUserInfo({ name: userData.name, email: userData.email })
        setIsSignedIn(true)

        // Store in localStorage for persistence
        localStorage.setItem("userInfo", JSON.stringify({ name: userData.name, email: userData.email }))
        localStorage.setItem("googleAccessToken", userData.access_token)

        // Clean up URL and redirect back
        window.history.replaceState({}, document.title, window.location.pathname)

        const preAuthUrl = localStorage.getItem("preAuthUrl")
        if (preAuthUrl && preAuthUrl !== window.location.href) {
          localStorage.removeItem("preAuthUrl")
        }
      }
    } catch (error) {
      console.error("OAuth callback error:", error)
      alert("Authentication failed. Please try again.")
    }
  }

  useEffect(() => {
    const newSparkles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
    }))
    setSparkles(newSparkles)

    // Remove sparkles after animation completes
    const timer = setTimeout(() => {
      setSparkles([])
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const handleSectionClick = async (sectionName: string) => {
    if (sectionName === "Registration") {
      if (!isSignedIn) {
        alert("Please sign in with Google to register.")
        return
      }
      setShowRegistrationForm(true)
      return
    }
    if (sectionName === "Participants") {
      if (!isSignedIn) {
        alert("Please sign in with Google to view participants.")
        return
      }
      setShowParticipants(true)
      loadParticipants() // Use the Google Sheets API function
      return
    }
    if (sectionName === "Financials") {
      setShowFinancials(true)
      setLoadingExpenses(true)

      try {
        console.log("Fetching expenses from API...")
        const response = await fetch("/api/get-expenses")
        const data = await response.json()
        console.log("Expenses API response:", data)

        if (data.success) {
          setExpenses(data.expenses)
        } else {
          alert(`Failed to load expenses data: ${data.error || "Unknown error"}`)
        }
      } catch (error) {
        console.error("Error fetching expenses:", error)
        alert("Error loading expenses data")
      } finally {
        setLoadingExpenses(false)
      }
      return
    }
    console.log(`Accessing ${sectionName} section`)
  }

  const handleProtectedSection = async (sectionName: string) => {
    if (!isSignedIn) {
      alert(`Please sign in with Google to access the ${sectionName} section.`)
      return
    }
    if (sectionName === "Registration") {
      setShowRegistrationForm(true)
      return
    }
    if (sectionName === "Participants") {
      setShowParticipants(true)
      await loadParticipants()
      return
    }
    if (sectionName === "Financials") {
      setShowFinancials(true)
      setLoadingExpenses(true)

      try {
        console.log("Fetching expenses from API...")
        const response = await fetch("/api/get-expenses")
        const data = await response.json()
        console.log("Expenses API response:", data)

        if (data.success) {
          setExpenses(data.expenses)
        } else {
          alert(`Failed to load expenses data: ${data.error || "Unknown error"}`)
        }
      } catch (error) {
        console.error("Error fetching expenses:", error)
        alert("Error loading expenses data")
      } finally {
        setLoadingExpenses(false)
      }
      return
    }
    console.log(`Accessing ${sectionName} section`)
  }

  const handleMenuClick = (sectionName: string) => {
    setActiveSection(sectionName)

    if (sectionName === "Registration") {
      setShowRegistrationForm(true)
      return
    }

    if (sectionName === "Participants") {
      setShowParticipants(true)
      loadParticipants()
      return
    }
  }

  const handleMobileMenuClick = (sectionName: string) => {
    setIsMobileMenuOpen(false)
    if (
      !isSignedIn &&
      (sectionName === "Registration" || sectionName === "Participants" || sectionName === "Financials")
    ) {
      alert("Please sign in with Google to access this section.")
      return
    }

    if (sectionName === "Registration") {
      setShowRegistrationForm(true)
      return
    }

    if (sectionName === "Participants") {
      setShowParticipants(true)
      return
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmitRegistration = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const registrationData = {
        fullName: formData.fullName,
        email: formData.email,
        address: formData.address,
        mobile: formData.mobile,
        adults: formData.adults,
        kids: formData.kids,
        zelleConfirmation: formData.zelleConfirmation,
        submittedBy: userInfo?.email || "unknown",
        timestamp: new Date().toISOString(),
      }

      // Save to JSON file (primary storage)
      const jsonResponse = await fetch("/api/participants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      })

      const jsonResult = await jsonResponse.json()

      if (jsonResult.success) {
        // Also submit to Google Sheets as backup
        try {
          await fetch("/api/submit-registration", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(registrationData),
          })
          console.log("[v0] Registration also saved to Google Sheets as backup")
        } catch (backupError) {
          console.warn("[v0] Google Sheets backup failed, but JSON storage succeeded:", backupError)
        }

        saveRegistrationToLocalStorage(formData)

        // Refresh dashboard stats
        await loadDashboardStats()

        const handleRegistrationSuccess = () => {
          setShowRegistrationForm(false)
          setFormData({
            fullName: "",
            email: "",
            address: "",
            mobile: "",
            adults: "",
            kids: "",
            zelleConfirmation: "",
          })

          loadDashboardStats()

          alert("Registration successful! Thank you for registering.")
        }
        handleRegistrationSuccess()

        loadDashboardStats()
      } else {
        alert("Registration failed. Please try again.")
      }
    } catch (error) {
      console.error("Registration error:", error)
      alert("Registration failed. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleExpenseSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    console.log("Submitting expense:", expenseFormData)

    try {
      const response = await fetch("/api/submit-expense", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...expenseFormData,
          submittedBy: userInfo?.name || "Unknown",
          timestamp: new Date().toISOString(),
        }),
      })

      const result = await response.json()
      console.log("Expense submission response:", result)

      if (result.success) {
        alert("Expense recorded successfully!")
        setExpenseFormData({
          category: "",
          description: "",
          amount: "",
          date: "",
          paidBy: "",
          receipt: "",
        })
        setShowExpenseForm(false)
        // Refresh expenses list
        handleProtectedSection("Financials")
      } else {
        alert(`Failed to record expense: ${result.error || "Unknown error"}`)
      }
    } catch (error) {
      console.error("Error submitting expense:", error)
      alert("Error recording expense. Please try again.")
    }
  }

  const handleBudgetUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    const budget = Number.parseFloat(newBudget)
    if (budget > 0) {
      setEventBudget(budget)
      setShowBudgetConfig(false)
      setNewBudget("")
      alert("Budget updated successfully!")
    }
  }

  const handleSignOut = () => {
    setIsSignedIn(false)
    setUserInfo(null)
    localStorage.removeItem("googleAccessToken")
    localStorage.removeItem("userInfo")
  }

  const handleVolunteerSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Volunteer form submitted:", volunteerForm)
    console.log("[v0] Current timestamp:", new Date().toISOString())
    console.log("[v0] User info:", userInfo)

    try {
      console.log("[v0] Sending volunteer data to API...")
      console.log("[v0] API URL:", "/api/submit-volunteer")
      console.log("[v0] Request method: POST")

      const requestData = {
        ...volunteerForm,
        timestamp: new Date().toISOString(),
        userEmail: userInfo?.email || "anonymous",
      }
      console.log("[v0] Request data:", requestData)

      const response = await fetch("/api/submit-volunteer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })

      console.log("[v0] Volunteer API response status:", response.status)
      console.log("[v0] Volunteer API response headers:", Object.fromEntries(response.headers.entries()))

      const responseData = await response.text()
      console.log("[v0] Volunteer API raw response:", responseData)

      let parsedResponse
      try {
        parsedResponse = JSON.parse(responseData)
        console.log("[v0] Volunteer API parsed response:", parsedResponse)
      } catch (parseError) {
        console.error("[v0] Failed to parse API response:", parseError)
        console.log("[v0] Raw response was:", responseData)
      }

      if (response.ok) {
        console.log("[v0] Volunteer submission successful!")
        alert("Thank you for volunteering! We will contact you with more details.")
        setVolunteerForm({
          name: "",
          email: "",
          volunteerType: "",
          cleanupDate: "",
        })
        setShowVolunteerModal(false)
        if (volunteerForm.volunteerType === "Prasadam Morning" || volunteerForm.volunteerType === "Prasadam Evening") {
          setVolunteerCounts((prev) => ({
            ...prev,
            [volunteerForm.volunteerType]: prev[volunteerForm.volunteerType] + 1,
          }))
        }
      } else {
        console.error("[v0] Volunteer submission failed with status:", response.status)
        console.error("[v0] Error response:", responseData)
        alert("Failed to submit volunteer registration. Please try again.")
      }
    } catch (error) {
      console.error("[v0] Error submitting volunteer form:", error)
      console.error("[v0] Error details:", {
        name: error.name,
        message: error.message,
        stack: error.stack,
      })
      alert("Failed to submit volunteer registration. Please try again.")
    }
  }

  const handleVolunteerSection = () => {
    if (!isSignedIn) {
      alert("Please sign in with Google to access volunteer registration.")
      return
    }
    setShowVolunteerModal(true)
  }

  const handleParticipantsSection = () => {
    if (!isSignedIn) {
      alert("Please sign in with Google to view participants.")
      return
    }
    setShowParticipants(true)
  }

  const loadParticipants = async () => {
    if (loadingParticipants) return

    setLoadingParticipants(true)
    try {
      console.log("[v0] Loading participants from JSON file...")
      const response = await fetch("/api/participants")

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log("[v0] Participants API response:", data)

      if (data.success && data.participants) {
        setParticipants(data.participants)
        console.log("[v0] Participants loaded from JSON file:", data.participants)
      } else {
        console.log("[v0] No participants found in JSON file")
        setParticipants([])
      }
    } catch (error) {
      console.error("[v0] Error loading participants from JSON file:", error)
      setParticipants([])
    } finally {
      setLoadingParticipants(false)
    }
  }

  const loadFinancials = async () => {
    setLoadingExpenses(true)

    try {
      console.log("Fetching expenses from API...")
      const response = await fetch("/api/get-expenses")
      const data = await response.json()
      console.log("Expenses API response:", data)

      if (data.success) {
        setExpenses(data.expenses)
      } else {
        alert(`Failed to load expenses data: ${data.error || "Unknown error"}`)
      }
    } catch (error) {
      console.error("Error fetching expenses:", error)
      alert("Error loading expenses data")
    } finally {
      setLoadingExpenses(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-red-50 relative">
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-10 z-0"
        style={{
          backgroundImage: "url('/lord-ganesha-meditation.png')",
        }}
      />

      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="fixed pointer-events-none z-50"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            animationDelay: `${sparkle.delay}s`,
          }}
        >
          <div className="w-1 h-1 bg-yellow-300 rounded-full opacity-40 animate-pulse"></div>
        </div>
      ))}

      <style jsx>{`
        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
      `}</style>

      {/* Header Navigation */}
      <header className="bg-white shadow-sm relative z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 md:space-x-3">
              <div className="relative">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download-jpjntClSQEuRWtoby7g0Tz712Dfjjb.jpeg"
                  alt="Pecan Tree"
                  className="w-8 h-8 md:w-12 md:h-12 object-contain opacity-75 mix-blend-overlay filter brightness-75 contrast-125"
                  style={{
                    maskImage: "radial-gradient(circle, rgba(0,0,0,1) 60%, rgba(0,0,0,0.3) 100%)",
                    WebkitMaskImage: "radial-gradient(circle, rgba(0,0,0,1) 60%, rgba(0,0,0,0.3) 100%)",
                  }}
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Mobile Google Sign In */}
              <Button
                className={`md:hidden ${
                  isSignedIn
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-300"
                } font-medium px-3 py-2 rounded-lg text-sm shadow-sm hover:shadow-md transition-all flex items-center space-x-1`}
                onClick={handleGoogleSignIn}
              >
                {isSignedIn ? (
                  <User className="w-4 h-4" />
                ) : (
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 8.55 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                )}
              </Button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                  <div
                    className={`w-6 h-0.5 bg-gray-600 transition-all ${isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}
                  ></div>
                  <div className={`w-6 h-0.5 bg-gray-600 transition-all ${isMobileMenuOpen ? "opacity-0" : ""}`}></div>
                  <div
                    className={`w-6 h-0.5 bg-gray-600 transition-all ${isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
                  ></div>
                </div>
              </button>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                <a
                  href="#"
                  className="flex items-center space-x-2 text-gray-700 hover:text-orange-600 transition-colors"
                >
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download-jpjntClSQEuRWtoby7g0Tz712Dfjjb.jpeg"
                    alt="Pecan Tree"
                    className="w-6 h-6 object-contain opacity-80 mix-blend-overlay filter brightness-90 contrast-110 saturate-110 drop-shadow-sm"
                  />
                  <HomeIcon className="w-4 h-4" />
                  <span className="text-sm font-medium">Home</span>
                </a>
                <button
                  onClick={() => handleSectionClick("Registration")}
                  className="flex items-center space-x-2 text-gray-700 hover:text-orange-600 transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span className="text-sm font-medium">Registration</span>
                  {!isSignedIn && <Lock className="w-3 h-3 text-gray-400" />}
                </button>
                <button
                  onClick={handleVolunteerSection}
                  className="flex items-center space-x-2 text-gray-700 hover:text-orange-600 transition-colors"
                >
                  <Heart className="w-4 h-4" />
                  <span className="text-sm font-medium">Volunteer</span>
                  {!isSignedIn && <Lock className="w-3 h-3 text-gray-400" />}
                </button>
                <a
                  href="#"
                  className="flex items-center space-x-2 text-gray-700 hover:text-orange-600 transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">Events</span>
                </a>
                <button
                  onClick={() => handleSectionClick("Gallery")}
                  className="flex items-center space-x-2 text-gray-700 hover:text-orange-600 transition-colors"
                >
                  <Trophy className="w-4 h-4" />
                  <span className="text-sm font-medium">Gallery</span>
                </button>
                <button
                  onClick={() => handleSectionClick("Participants")}
                  className="flex items-center space-x-2 text-gray-700 hover:text-orange-600 transition-colors"
                >
                  <Users className="w-4 h-4" />
                  <span className="text-sm font-medium">Participants</span>
                  {!isSignedIn && <Lock className="w-3 h-3 text-gray-400" />}
                </button>
                <button
                  onClick={() => handleSectionClick("Financials")}
                  className="flex items-center space-x-2 text-gray-700 hover:text-orange-600 transition-colors"
                >
                  <DollarSign className="w-4 h-4" />
                  <span className="text-sm font-medium">Financials</span>
                  {!isSignedIn && <Lock className="w-3 h-3 text-gray-400" />}
                </button>
                <a
                  href="#faq"
                  className="flex items-center space-x-2 text-gray-700 hover:text-orange-600 transition-colors"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">FAQ</span>
                </a>
                <Button
                  className={`${
                    isSignedIn
                      ? "bg-green-500 hover:bg-green-600 text-white"
                      : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-300"
                  } font-medium px-4 py-2 rounded-lg text-sm shadow-sm hover:shadow-md transition-all flex items-center space-x-2`}
                  onClick={handleGoogleSignIn}
                >
                  {isSignedIn ? (
                    <>
                      <User className="w-4 h-4" />
                      <span>Signed In</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      <span>Sign in with Google</span>
                    </>
                  )}
                </Button>
                <Search className="w-5 h-5 text-gray-700 cursor-pointer hover:text-orange-600 transition-colors" />
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
          <nav className="flex flex-col space-y-4 pt-4">
            <a
              href="#"
              className="flex items-center space-x-3 text-gray-700 hover:text-orange-600 transition-colors py-2"
            >
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download-jpjntClSQEuRWtoby7g0Tz712Dfjjb.jpeg"
                alt="Pecan Tree"
                className="w-5 h-5 object-contain opacity-80 mix-blend-overlay filter brightness-90 contrast-110 saturate-110 drop-shadow-sm"
              />
              <HomeIcon className="w-5 h-5" />
              <span className="font-medium">Home</span>
            </a>
            <button
              onClick={() => {
                handleSectionClick("Registration")
                setIsMobileMenuOpen(false)
              }}
              className="flex items-center space-x-3 text-gray-700 hover:text-orange-600 transition-colors py-2 text-left"
            >
              <User className="w-5 h-5" />
              <span className="font-medium">Registration</span>
              {!isSignedIn && <Lock className="w-4 h-4 text-gray-400" />}
            </button>
            <button
              onClick={() => {
                handleVolunteerSection()
                setIsMobileMenuOpen(false)
              }}
              className="flex items-center space-x-3 text-gray-700 hover:text-orange-600 transition-colors py-2 text-left"
            >
              <Heart className="w-5 h-5" />
              <span className="font-medium">Volunteer</span>
              {!isSignedIn && <Lock className="w-4 h-4 text-gray-400" />}
            </button>
            <a
              href="#"
              className="flex items-center space-x-3 text-gray-700 hover:text-orange-600 transition-colors py-2"
            >
              <Calendar className="w-5 h-5" />
              <span className="font-medium">Events</span>
            </a>
            <button
              onClick={() => {
                handleGallerySection()
                setIsMobileMenuOpen(false)
              }}
              className="flex items-center space-x-3 text-gray-700 hover:text-orange-600 transition-colors py-2 text-left"
            >
              <Trophy className="w-5 h-5" />
              <span className="font-medium">Gallery</span>
            </button>
            <button
              onClick={() => {
                handleSectionClick("Participants")
                setIsMobileMenuOpen(false)
              }}
              className="flex items-center space-x-3 text-gray-700 hover:text-orange-600 transition-colors py-2 text-left"
            >
              <Users className="w-5 h-5" />
              <span className="font-medium">Participants</span>
              {!isSignedIn && <Lock className="w-4 h-4 text-gray-400" />}
            </button>
            <button
              onClick={() => {
                handleSectionClick("Financials")
                setIsMobileMenuOpen(false)
              }}
              className="flex items-center space-x-3 text-gray-700 hover:text-orange-600 transition-colors py-2 text-left"
            >
              <DollarSign className="w-5 h-5" />
              <span className="font-medium">Financials</span>
              {!isSignedIn && <Lock className="w-4 h-4 text-gray-400" />}
            </button>
            <a
              href="#faq"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center space-x-3 text-gray-700 hover:text-orange-600 transition-colors py-2"
            >
              <HelpCircle className="w-5 h-5" />
              <span className="font-medium">FAQ</span>
            </a>
          </nav>
        </div>
      )}
    </div>
  )
}
