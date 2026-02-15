"use client"
import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { XCircle, Loader2, Home, Calendar, RotateCcw } from 'lucide-react'
import Link from 'next/link'
import { Header } from '../../../components/Header'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000'

function BookingCancelContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const sessionId = searchParams.get('session_id')
  const bookingId = searchParams.get('booking_id')
  
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulated delay to show loading state
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <Loader2 className="w-16 h-16 animate-spin text-[#FC5E39] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Processing...</h2>
          <p className="text-gray-600">Please wait</p>
        </div>
      </div>
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full">
        {/* Cancel Icon */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-in zoom-in duration-500">
            <XCircle className="w-16 h-16 text-red-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Booking Cancelled
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Your booking was not completed. No charges have been made.
          </p>
          {sessionId && (
            <p className="text-sm text-gray-500">
              Session ID: {sessionId.substring(0, 20)}...
            </p>
          )}
          {bookingId && (
            <p className="text-sm text-gray-500">
              Booking ID: {bookingId}
            </p>
          )}
        </div>

        {/* Information */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#FC5E39]" />
            What Happened?
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-gray-300 text-white rounded-full flex items-center justify-center text-sm flex-shrink-0 mt-0.5">1</span>
              <span>Your payment was cancelled or declined</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-gray-300 text-white rounded-full flex items-center justify-center text-sm flex-shrink-0 mt-0.5">2</span>
              <span>No booking has been created</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-gray-300 text-white rounded-full flex items-center justify-center text-sm flex-shrink-0 mt-0.5">3</span>
              <span>No charges have been made to your card</span>
            </li>
          </ul>
        </div>

        {/* Reasons */}
        <div className="bg-gray-50 rounded-2xl p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-2">Common Reasons:</h3>
          <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
            <li>Payment was cancelled by you</li>
            <li>Card was declined or had insufficient funds</li>
            <li>Browser window was closed during payment</li>
            <li>Session timed out</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link 
            href="/#booking-form"
            className="flex-1 flex items-center justify-center gap-2 bg-[#FC5E39] hover:bg-[#e54d2e] text-white font-bold py-4 rounded-full transition-colors shadow-lg"
          >
            <RotateCcw className="w-5 h-5" />
            Try Again
          </Link>
          <Link 
            href="/"
            className="flex-1 flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-4 rounded-full transition-colors"
          >
            <Home className="w-5 h-5" />
            Back to Home
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
    </>
  )
}

export default function BookingCancel() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <Loader2 className="w-16 h-16 animate-spin text-[#FC5E39] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading...</h2>
        </div>
      </div>
    }>
      <BookingCancelContent />
    </Suspense>
  )
}
