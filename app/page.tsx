import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Home,
  Users,
  Calendar,
  Trophy,
  History,
  HelpCircle,
  User,
  Search,
  Sparkles,
  Heart,
  Star,
  MapPin,
  Clock,
  Music,
} from "lucide-react"

export default function GaneshaChaturthi2025() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-red-50">
      <div
        className="fixed inset-0 opacity-10 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{
          backgroundImage: `url('/lord-ganesha-meditation.png')`,
        }}
      />

      {/* Header Navigation */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-orange-200 shadow-sm relative z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-gray-900 font-bold text-2xl font-serif">Pecan Meadow</h1>
                <p className="text-orange-600 text-sm font-medium">Community Celebration</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="flex items-center space-x-2 text-gray-700 hover:text-orange-600 transition-colors">
                <Home className="w-4 h-4" />
                <span className="text-sm font-medium">Home</span>
              </a>
              <a href="#" className="flex items-center space-x-2 text-gray-700 hover:text-orange-600 transition-colors">
                <Users className="w-4 h-4" />
                <span className="text-sm font-medium">Community</span>
              </a>
              <a href="#" className="flex items-center space-x-2 text-gray-700 hover:text-orange-600 transition-colors">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">Events</span>
              </a>
              <a href="#" className="flex items-center space-x-2 text-gray-700 hover:text-orange-600 transition-colors">
                <Trophy className="w-4 h-4" />
                <span className="text-sm font-medium">Gallery</span>
              </a>
              <a href="#" className="flex items-center space-x-2 text-gray-700 hover:text-orange-600 transition-colors">
                <History className="w-4 h-4" />
                <span className="text-sm font-medium">History</span>
              </a>
              <a href="#" className="flex items-center space-x-2 text-gray-700 hover:text-orange-600 transition-colors">
                <HelpCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Contact</span>
              </a>
              <a href="#" className="flex items-center space-x-2 text-gray-700 hover:text-orange-600 transition-colors">
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">Profile</span>
              </a>
              <Search className="w-5 h-5 text-gray-700 cursor-pointer hover:text-orange-600 transition-colors" />
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 via-amber-300/20 to-red-400/20"></div>
        <div className="container mx-auto px-4 py-20 relative">
          <div className="text-center mb-16">
            <div className="inline-block p-8 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-3xl mb-8 backdrop-blur-sm border border-orange-300/30 shadow-xl">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl flex items-center justify-center shadow-lg">
                <Star className="w-12 h-12 text-white" />
              </div>
            </div>

            <div className="space-y-6 mb-10">
              <p className="text-orange-700 text-xl font-semibold tracking-wide">Pecan Meadow Community Presents</p>
              <h1 className="text-gray-900 text-7xl md:text-8xl font-bold font-serif leading-tight">
                <span className="bg-gradient-to-r from-orange-600 via-red-500 to-orange-700 bg-clip-text text-transparent">
                  Ganesha
                </span>
                <br />
                <span className="text-amber-600">Chaturthi</span>
              </h1>
              <p className="text-red-600 text-4xl font-bold tracking-wider">2025</p>
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-8">
              <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-orange-200">
                <Calendar className="w-5 h-5 text-orange-600" />
                <span className="text-gray-800 font-semibold">September 15-17, 2025</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-orange-200">
                <MapPin className="w-5 h-5 text-orange-600" />
                <span className="text-gray-800 font-semibold">Community Center</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-orange-200">
                <Clock className="w-5 h-5 text-orange-600" />
                <span className="text-gray-800 font-semibold">10 AM - 8 PM</span>
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
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                <Star className="w-8 h-8 text-white" />
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
