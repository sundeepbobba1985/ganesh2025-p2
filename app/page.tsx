"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Calendar,
  Trophy,
  DollarSign,
  HelpCircle,
  User,
  Search,
  Heart,
  MapPin,
  Clock,
  Music,
  Lock,
} from "lucide-react"
import { useState, useEffect } from "react"

export default function HomePage() {
  const [isSignedIn, setIsSignedIn] = useState(false)

  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])

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

  const handleGoogleSignIn = () => {
    setIsSignedIn(!isSignedIn)
  }

  const handleProtectedSection = (sectionName: string) => {
    if (!isSignedIn) {
      alert(`Please sign in with Google to access the ${sectionName} section.`)
      return
    }
    console.log(`Accessing ${sectionName} section`)
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
          from { opacity: 1; }
          to { opacity: 0; }
        }
      `}</style>

      {/* Header Navigation */}
      <header className="bg-white shadow-sm relative z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download-jpjntClSQEuRWtoby7g0Tz712Dfjjb.jpeg"
                  alt="Pecan Tree"
                  className="w-12 h-12 object-contain opacity-75 mix-blend-overlay filter brightness-75 contrast-125"
                  style={{
                    maskImage: "radial-gradient(circle, rgba(0,0,0,1) 60%, rgba(0,0,0,0.3) 100%)",
                    WebkitMaskImage: "radial-gradient(circle, rgba(0,0,0,1) 60%, rgba(0,0,0,0.3) 100%)",
                  }}
                />
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="flex items-center space-x-2 text-gray-700 hover:text-orange-600 transition-colors">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download-jpjntClSQEuRWtoby7g0Tz712Dfjjb.jpeg"
                  alt="Pecan Tree"
                  className="w-6 h-6 object-contain opacity-80 mix-blend-overlay filter brightness-90 contrast-110 saturate-120 drop-shadow-sm"
                />
                <span className="text-sm font-medium">Home</span>
              </a>
              <button
                onClick={() => handleProtectedSection("Participants")}
                className="flex items-center space-x-2 text-gray-700 hover:text-orange-600 transition-colors"
              >
                <Users className="w-4 h-4" />
                <span className="text-sm font-medium">Participants</span>
                {!isSignedIn && <Lock className="w-3 h-3 text-gray-400" />}
              </button>
              <a href="#" className="flex items-center space-x-2 text-gray-700 hover:text-orange-600 transition-colors">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">Events</span>
              </a>
              <a href="#" className="flex items-center space-x-2 text-gray-700 hover:text-orange-600 transition-colors">
                <Trophy className="w-4 h-4" />
                <span className="text-sm font-medium">Gallery</span>
              </a>
              <button
                onClick={() => handleProtectedSection("Financials")}
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
              <a href="#" className="flex items-center space-x-2 text-gray-700 hover:text-orange-600 transition-colors">
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">Profile</span>
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
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden z-10">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-orange-200/20 text-[40rem] font-bold animate-pulse select-none">ॐ</div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 via-amber-300/20 to-red-400/20"></div>
        <div className="container mx-auto px-4 py-20 relative">
          <div className="text-center mb-16">
            <div className="text-center relative">
              <div className="relative inline-block">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download-jpjntClSQEuRWtoby7g0Tz712Dfjjb.jpeg"
                  alt="Pecan Tree"
                  className="w-20 h-20 object-contain opacity-60 mix-blend-soft-light filter brightness-90 contrast-110 saturate-125"
                  style={{
                    maskImage:
                      "radial-gradient(ellipse, rgba(0,0,0,0.9) 40%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.1) 100%)",
                    WebkitMaskImage:
                      "radial-gradient(ellipse, rgba(0,0,0,0.9) 40%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.1) 100%)",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-red-500/20 mix-blend-color-burn rounded-full blur-sm"></div>
              </div>
            </div>

            <div className="mb-8">
              <p className="text-orange-700 text-lg font-semibold tracking-wide uppercase mb-2">
                Pecan Meadow Community
              </p>
              <p className="text-amber-600 text-xl font-medium italic">Presents</p>
            </div>

            <div className="space-y-6 mb-10">
              <h1 className="text-gray-900 text-7xl md:text-8xl font-bold font-serif leading-tight">
                <span className="bg-gradient-to-r from-orange-600 via-red-500 to-orange-700 bg-clip-text text-transparent">
                  Ganesh
                </span>
                <br />
                <span className="text-amber-600">Chaturthi</span>
                <br />
                <span className="text-red-600 text-6xl">2025</span>
              </h1>
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-8">
              <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-orange-200">
                <Calendar className="w-5 h-5 text-orange-600" />
                <span className="text-gray-800 font-semibold">August 26-30, 2025</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-orange-200">
                <MapPin className="w-5 h-5 text-orange-600" />
                {isSignedIn ? (
                  <span className="text-gray-800 font-semibold">1991, Kieva Pls, Allen, TX 75013</span>
                ) : (
                  <button
                    onClick={() => alert("Please sign in with Google to view location")}
                    className="text-gray-800 font-semibold hover:text-orange-600 transition-colors"
                  >
                    View location
                  </button>
                )}
              </div>
              <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-orange-200">
                <Clock className="w-5 h-5 text-orange-600" />
                <span className="text-gray-800 font-semibold">7:00 AM - 8:30 AM | 6:00 PM - 9:00 PM</span>
              </div>
            </div>

            <p className="text-gray-700 text-xl max-w-4xl mx-auto leading-relaxed mb-6 font-medium">
              Join us for a magnificent celebration of Lord Ganesha with traditional rituals, cultural performances,
              delicious prasadam, and community bonding that brings our neighborhood together.
            </p>

            <p className="text-gray-600 text-lg max-w-5xl mx-auto leading-relaxed">
              Experience the divine blessings of Ganpati Bappa through three days of devotion, music, dance, and
              fellowship. From morning aarti to evening cultural programs, immerse yourself in the rich traditions that
              unite our diverse community in celebration.
            </p>
          </div>
        </div>
      </section>

      {/* Registration Process Card */}
      <section className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/90 backdrop-blur-sm border border-orange-200 shadow-2xl rounded-3xl overflow-hidden">
            <CardContent className="p-12">
              <div className="text-center mb-10">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-lg">
                  <Music className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-gray-900 text-4xl font-bold font-serif mb-4">Participation Guide</h2>
                <p className="text-orange-700 text-lg font-medium">Simple steps to join our celebration</p>
              </div>

              <div className="text-center mb-12">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-8 mb-8">
                  <h3 className="text-gray-900 text-2xl font-bold mb-4">Quick Registration</h3>
                  <p className="text-gray-600 mb-6">Sign in with Google for faster registration and updates</p>
                  <Button
                    className={`${
                      isSignedIn
                        ? "bg-green-500 hover:bg-green-600 text-white"
                        : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-300"
                    } font-medium px-8 py-3 rounded-full text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center space-x-3 mx-auto`}
                    onClick={handleGoogleSignIn}
                  >
                    {isSignedIn ? (
                      <>
                        <User className="w-5 h-5" />
                        <span>Welcome! You're signed in</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
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
                        <span>Continue with Google</span>
                      </>
                    )}
                  </Button>
                  <p className="text-gray-500 text-sm mt-4">Or follow the manual registration process below</p>
                </div>
              </div>

              <div className="space-y-8 text-gray-800">
                <div className="space-y-6">
                  <div className="flex items-start space-x-6 p-6 rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 shadow-sm hover:shadow-md transition-shadow">
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 mt-1 px-4 py-2 text-lg font-bold rounded-full">
                      1
                    </Badge>
                    <div className="flex-1">
                      <p className="font-bold text-xl mb-3 text-gray-900">REGISTRATION: $25 per family</p>
                      <p className="text-gray-700 leading-relaxed text-lg">
                        Secure your family's participation in all three days of festivities. Registration includes daily
                        prasadam, cultural program access, and commemorative items for children.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-6 p-6 rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 shadow-sm hover:shadow-md transition-shadow">
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 mt-1 px-4 py-2 text-lg font-bold rounded-full">
                      2
                    </Badge>
                    <div className="flex-1">
                      <p className="text-gray-700 leading-relaxed text-lg">
                        Payment via Zelle: <span className="font-bold text-orange-700">pv.ganesha@gmail.com</span>
                        <br />
                        <span className="text-base text-gray-600">Or cash payment at community office</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-6 p-6 rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 shadow-sm hover:shadow-md transition-shadow">
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 mt-1 px-4 py-2 text-lg font-bold rounded-full">
                      3
                    </Badge>
                    <div className="flex-1">
                      <p className="text-gray-700 leading-relaxed text-lg">
                        Include family member names, contact information, and any special dietary requirements.
                        Confirmation will be sent within 24 hours.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-6 p-6 rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 shadow-sm hover:shadow-md transition-shadow">
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 mt-1 px-4 py-2 text-lg font-bold rounded-full">
                      4
                    </Badge>
                    <div className="flex-1">
                      <p className="text-gray-700 leading-relaxed text-lg">
                        Volunteer opportunities available! Sign up for decoration, prasadam preparation, or event
                        coordination to earn community service hours.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-orange-200 pt-10">
                  <div className="space-y-6">
                    <div className="flex items-start space-x-6 p-6 rounded-2xl bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 shadow-sm">
                      <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 mt-1 px-4 py-2 text-lg font-bold rounded-full">
                        Final
                      </Badge>
                      <div className="flex-1">
                        <p className="text-gray-700 leading-relaxed text-lg">
                          Receive your digital invitation with daily schedules, parking information, and special
                          instructions for cultural performances and aarti timings.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-6 p-6 rounded-2xl bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 shadow-sm">
                      <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 mt-1 px-4 py-2 text-lg font-bold rounded-full">
                        Bonus
                      </Badge>
                      <div className="flex-1">
                        <p className="text-gray-700 leading-relaxed text-lg">
                          Join our WhatsApp community group for real-time updates, photo sharing, and coordination with
                          other families throughout the celebration.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mt-12">
                <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-12 py-4 rounded-full text-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                  Register Your Family
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Event Highlights */}
      <section className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-gray-900 text-4xl font-bold font-serif mb-6">Festival Highlights</h2>
          <p className="text-gray-700 text-xl leading-relaxed mb-8">
            Three days of divine celebration featuring traditional rituals, vibrant cultural performances, and delicious
            community meals that bring families together in the spirit of devotion.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-orange-200">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-orange-100 to-red-100 mb-4 relative overflow-hidden">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download-jpjntClSQEuRWtoby7g0Tz712Dfjjb.jpeg"
                    alt="Pecan Tree"
                    className="w-12 h-12 object-contain opacity-70 mix-blend-darken filter brightness-85 contrast-115"
                    style={{
                      maskImage:
                        "radial-gradient(circle, rgba(0,0,0,0.95) 50%, rgba(0,0,0,0.6) 80%, rgba(0,0,0,0.2) 100%)",
                      WebkitMaskImage:
                        "radial-gradient(circle, rgba(0,0,0,0.95) 50%, rgba(0,0,0,0.6) 80%, rgba(0,0,0,0.2) 100%)",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-300/30 to-red-400/30 mix-blend-multiply"></div>
                </div>
              </div>
              <h3 className="text-gray-900 text-xl font-bold mb-4">Daily Aarti</h3>
              <p className="text-gray-600">
                Morning and evening prayers with traditional bhajans and community participation
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-orange-200">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                <Music className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-gray-900 text-xl font-bold mb-4">Cultural Programs</h3>
              <p className="text-gray-600">Dance performances, music concerts, and children's talent showcase</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-orange-200">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-gray-900 text-xl font-bold mb-4">Community Feast</h3>
              <p className="text-gray-600">Traditional prasadam and special meals prepared with love by volunteers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 shadow-2xl rounded-3xl overflow-hidden">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-lg">
                <Heart className="w-10 h-10 text-white" />
              </div>

              <h2 className="text-gray-900 text-4xl font-bold font-serif mb-6">Share Your Blessings</h2>

              <p className="text-gray-700 text-xl leading-relaxed mb-6">
                Your participation and feedback help us create meaningful celebrations that strengthen our community
                bonds and preserve our beautiful traditions for future generations.
              </p>

              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Whether you'd like to share a special moment, suggest improvements for next year, or volunteer for
                upcoming events, we welcome your thoughts and involvement in making our celebrations even more special.
              </p>

              <p className="text-gray-500 text-lg leading-relaxed mb-10 font-medium">
                Ganpati Bappa Morya! Together we celebrate, together we grow.
              </p>

              <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold px-12 py-4 rounded-full text-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                Share Your Experience
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="faq" className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 text-4xl font-bold font-serif mb-6">Frequently Asked Questions</h2>
            <p className="text-gray-700 text-xl">Everything you need to know about our Ganesha Chaturthi celebration</p>
          </div>

          <div className="space-y-6">
            <Card className="bg-white/90 backdrop-blur-sm border border-orange-200 shadow-lg rounded-2xl">
              <CardContent className="p-8">
                <h3 className="text-gray-900 text-xl font-bold mb-4">What is included in the registration fee?</h3>
                <p className="text-gray-700 leading-relaxed">
                  The $25 family registration includes daily prasadam for all three days, access to all cultural
                  programs, commemorative items for children, and participation in all rituals and ceremonies.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border border-orange-200 shadow-lg rounded-2xl">
              <CardContent className="p-8">
                <h3 className="text-gray-900 text-xl font-bold mb-4">What are the event timings?</h3>
                <div className="text-gray-700 leading-relaxed space-y-2">
                  <p>
                    <strong>Daily Schedule:</strong>
                  </p>
                  <p>• Mornings: 7:00 AM to 8:30 AM</p>
                  <p>• Evenings: 6:00 PM to 9:00 PM</p>
                  <p className="mt-4">
                    <strong>Special Events:</strong>
                  </p>
                  <p>• Main Pooja: August 26th at 4:30 PM</p>
                  <p>• Nimajjan Pooja: August 30th at 4:30 PM</p>
                  <p>• Nimajjan Procession: August 30th, 5:00 PM - 7:00 PM</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border border-orange-200 shadow-lg rounded-2xl">
              <CardContent className="p-8">
                <h3 className="text-gray-900 text-xl font-bold mb-4">Can I volunteer for the event?</h3>
                <p className="text-gray-700 leading-relaxed">
                  We welcome volunteers for decoration, prasadam preparation, event coordination, and cleanup. Volunteer
                  hours can count towards community service requirements.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border border-orange-200 shadow-lg rounded-2xl">
              <CardContent className="p-8">
                <h3 className="text-gray-900 text-xl font-bold mb-4">Is parking available at the venue?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Yes, free parking is available at the venue. Additional overflow parking will be available at nearby
                  locations with shuttle service during peak hours.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border border-orange-200 shadow-lg rounded-2xl">
              <CardContent className="p-8">
                <h3 className="text-gray-900 text-xl font-bold mb-4">Are there activities for children?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Yes! We have special children's programs including storytelling, art activities, talent showcase, and
                  traditional games. Children will also receive commemorative items and participate in special rituals.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Bottom Action Buttons */}
      <section className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-12 py-4 rounded-full text-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
            View Event Schedule
          </Button>
          <Button
            variant="outline"
            className="border-2 border-orange-400 text-orange-600 hover:bg-orange-500 hover:text-white hover:border-orange-500 font-bold px-12 py-4 rounded-full text-xl bg-white/80 backdrop-blur-sm transition-all transform hover:scale-105"
          >
            Photo Gallery
          </Button>
        </div>
      </section>
    </div>
  )
}
