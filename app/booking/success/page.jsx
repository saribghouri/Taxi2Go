"use client"
import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { CheckCircle, Loader2, Home, Calendar, MapPin, Car, CreditCard } from 'lucide-react'
import Link from 'next/link'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000'

export default function BookingSuccess() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const sessionId = searchParams.get('session_id')
  
  const [bookingDetails, setBookingDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (sessionId) {
      verifyPayment()
    } else {
      setError('No session ID found')
      setLoading(false)
    }
  }, [sessionId])

  const verifyPayment = async () => {
    try {
      // Optional: Call your backend to verify the payment and get booking details
      // For now, we'll just show a success message
      // You can implement backend verification endpoint later
      
      // Simulated delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setLoading(false)
    } catch (err) {
      setError('Failed to verify payment')
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <Loader2 className="w-16 h-16 animate-spin text-[#FC5E39] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Processing Payment...</h2>
          <p className="text-gray-600">Please wait while we confirm your booking</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">❌</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Something Went Wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link 
            href="/"
            className="inline-flex items-center gap-2 bg-[#FC5E39] hover:bg-[#e54d2e] text-white font-bold py-3 px-6 rounded-full transition-colors"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-in zoom-in duration-500">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Booking Confirmed! 🎉
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Your payment was successful and your taxi is on the way!
          </p>
          <p className="text-sm text-gray-500">
            Session ID: {sessionId?.substring(0, 20)}...
          </p>
        </div>

        {/* Booking Details */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#FC5E39]" />
            What's Next?
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-[#FC5E39] text-white rounded-full flex items-center justify-center text-sm flex-shrink-0 mt-0.5">1</span>
              <span>You will receive a confirmation SMS and email shortly</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-[#FC5E39] text-white rounded-full flex items-center justify-center text-sm flex-shrink-0 mt-0.5">2</span>
              <span>Your driver will be assigned and will contact you</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-[#FC5E39] text-white rounded-full flex items-center justify-center text-sm flex-shrink-0 mt-0.5">3</span>
              <span>Track your ride status via the phone number provided</span>
            </li>
          </ul>
        </div>

        {/* Payment Info */}
        <div className="bg-gray-50 rounded-2xl p-4 mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <CreditCard className="w-4 h-4 text-green-600" />
            <span className="font-semibold text-green-600">Payment Successful</span>
            <span className="mx-2">•</span>
            <span>Your card has been charged</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link 
            href="/"
            className="flex-1 flex items-center justify-center gap-2 bg-[#FC5E39] hover:bg-[#e54d2e] text-white font-bold py-4 rounded-full transition-colors shadow-lg"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
          <Link 
            href="/#booking-form"
            className="flex-1 flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-4 rounded-full transition-colors"
          >
            <Car className="w-5 h-5" />
            Book Another Ride
          </Link>
        </div>

        {/* Contact Support */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Need help? Contact us at{' '}
            <a href="mailto:support@taxi2go.com" className="text-[#FC5E39] hover:underline font-semibold">
              support@taxi2go.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
