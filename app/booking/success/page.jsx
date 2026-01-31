"use client"
import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { CheckCircle, Loader2, Home, Calendar, MapPin, Car, CreditCard } from 'lucide-react'
import Link from 'next/link'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000'

function BookingSuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const sessionId = searchParams.get('session_id')
  const bookingId = searchParams.get('booking_id')

  const [bookingDetails, setBookingDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (sessionId || bookingId) {
      verifyPayment()
    } else {
      setError('No session or booking ID found')
      setLoading(false)
    }
  }, [sessionId, bookingId])

  const verifyPayment = async () => {
    try {
      if (!bookingId) {
        setError('No booking ID provided')
        setLoading(false)
        return
      }

      // Fetch booking details from backend
      const response = await fetch(`${API_BASE_URL}/api/booking/${bookingId}`)

      if (!response.ok) {
        throw new Error('Failed to fetch booking details')
      }

      const data = await response.json()

      if (data.success && data.data) {
        setBookingDetails(data.data)
      } else {
        throw new Error('Invalid response from server')
      }

      setLoading(false)
    } catch (err) {
      console.error('Error fetching booking:', err)
      setError(err.message || 'Failed to fetch booking details')
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
          <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 animate-in zoom-in duration-500 ${bookingDetails?.bookingStatus === 'Confirmed' || bookingDetails?.bookingStatus === 'Completed'
              ? 'bg-green-100'
              : 'bg-yellow-100'
            }`}>
            <CheckCircle className={`w-16 h-16 ${bookingDetails?.bookingStatus === 'Confirmed' || bookingDetails?.bookingStatus === 'Completed'
                ? 'text-green-500'
                : 'text-yellow-500'
              }`} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            {bookingDetails?.bookingStatus === 'Confirmed' || bookingDetails?.bookingStatus === 'Completed'
              ? 'Booking Confirmed! 🎉'
              : 'Booking Received! ✅'
            }
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            {bookingDetails?.bookingStatus === 'Confirmed' || bookingDetails?.bookingStatus === 'Completed'
              ? (sessionId
                ? 'Your payment was successful and your taxi is on the way!'
                : 'Your booking has been confirmed and your taxi will arrive soon!')
              : 'Your booking is under review. Our admin will confirm it shortly and you\'ll receive a notification.'
            }
          </p>
          {bookingDetails && (
            <div className="mt-4 inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
              <span className="text-sm text-gray-600">Booking ID:</span>
              <span className="text-sm font-mono font-bold text-gray-900">{bookingDetails._id || bookingId}</span>
            </div>
          )}
        </div>

        {/* Booking Status */}
        {bookingDetails && (
          <div className="mb-6">
            <div className={`rounded-2xl p-4 text-center ${bookingDetails.bookingStatus === 'Confirmed' || bookingDetails.bookingStatus === 'Completed'
                ? 'bg-green-50 border-2 border-green-200'
                : bookingDetails.bookingStatus === 'Pending'
                  ? 'bg-yellow-50 border-2 border-yellow-200'
                  : 'bg-gray-50 border-2 border-gray-200'
              }`}>
              <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-semibold text-gray-600">Status:</span>
                <span className={`text-lg font-bold ${bookingDetails.bookingStatus === 'Confirmed' || bookingDetails.bookingStatus === 'Completed'
                    ? 'text-green-600'
                    : bookingDetails.bookingStatus === 'Pending'
                      ? 'text-yellow-600'
                      : 'text-gray-600'
                  }`}>
                  {bookingDetails.bookingStatus || 'Pending'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Trip Details */}
        {bookingDetails && (
          <div className="bg-gray-50 rounded-2xl p-6 mb-6 space-y-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Trip Details</h2>

            {/* Pickup & Dropoff */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-xs text-gray-500 font-medium">Pickup Location</p>
                  <p className="text-sm font-semibold text-gray-900">{bookingDetails.pickupAddress}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#FC5E39] mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-xs text-gray-500 font-medium">Dropoff Location</p>
                  <p className="text-sm font-semibold text-gray-900">{bookingDetails.dropoffAddress}</p>
                </div>
              </div>
            </div>

            {/* Vehicle & Passenger */}
            <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-200">
              <div>
                <p className="text-xs text-gray-500 font-medium mb-1">Vehicle</p>
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-[#FC5E39]" />
                  <p className="text-sm font-semibold text-gray-900">{bookingDetails.vehicleType || 'Taxi'}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium mb-1">Passenger</p>
                <p className="text-sm font-semibold text-gray-900">{bookingDetails.passengerId?.fullName || bookingDetails.passengerName}</p>
              </div>
            </div>

            {/* Pickup Time */}
            <div className="pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-500 font-medium mb-1">Pickup Time</p>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#FC5E39]" />
                <p className="text-sm font-semibold text-gray-900">
                  {new Date(bookingDetails.pickupTime).toLocaleString('en-AU', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                    timeZone: 'Australia/Sydney'
                  })}
                </p>
              </div>
            </div>

            {/* Distance & Duration */}
            {bookingDetails.distanceKm && (
              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-200">
                <div>
                  <p className="text-xs text-gray-500 font-medium mb-1">Distance</p>
                  <p className="text-sm font-semibold text-gray-900">{bookingDetails.distanceKm} km</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium mb-1">Duration</p>
                  <p className="text-sm font-semibold text-gray-900">{bookingDetails.durationMinutes} min</p>
                </div>
              </div>
            )}

            {/* Additional Services */}
            {(bookingDetails.childSeat || bookingDetails.wheelchair || bookingDetails.specialRequirements) && (
              <div className="pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-500 font-medium mb-2">Additional Services</p>
                <div className="flex flex-wrap gap-2">
                  {bookingDetails.childSeat && (
                    <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                      👶 Child Seat (+${bookingDetails.childSeatCharge?.toFixed(2) || '10.00'})
                    </span>
                  )}
                  {bookingDetails.wheelchair && (
                    <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">
                      ♿ Wheelchair (+${bookingDetails.wheelchairCharge?.toFixed(2) || '15.00'})
                    </span>
                  )}
                </div>
                {bookingDetails.specialRequirements && (
                  <div className="mt-2 bg-gray-100 rounded-lg p-3">
                    <p className="text-xs text-gray-500 font-medium mb-1">Special Requirements</p>
                    <p className="text-sm text-gray-700">{bookingDetails.specialRequirements}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Passenger Contact Details */}
        {bookingDetails && bookingDetails.passengerId && (
          <div className="bg-blue-50 rounded-2xl p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Passenger Details</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Name</span>
                <span className="text-sm font-semibold text-gray-900">{bookingDetails.passengerId.fullName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Phone</span>
                <span className="text-sm font-semibold text-gray-900">{bookingDetails.passengerId.phone}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Email</span>
                <span className="text-sm font-semibold text-gray-900 truncate ml-2">{bookingDetails.passengerId.email}</span>
              </div>
            </div>
          </div>
        )}

        {/* Payment & Fare Breakdown */}
        {bookingDetails && (
          <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-2xl p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Fare Breakdown</h2>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Base Fare</span>
                <span className="text-sm font-semibold text-gray-900">
                  ${(bookingDetails.totalFare - bookingDetails.levy)?.toFixed(2) || '0.00'}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Levy Charges</span>
                <span className="text-sm font-semibold text-gray-900">
                  ${bookingDetails.levy?.toFixed(2) || '0.00'}
                </span>
              </div>

              <div className="pt-3 mt-3 border-t-2 border-orange-300">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total Fare</span>
                  <span className="text-3xl font-bold text-[#FC5E39]">
                    ${(bookingDetails.totalFare || 0).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* What's Next */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-6 mb-6">
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

export default function BookingSuccess() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <Loader2 className="w-16 h-16 animate-spin text-[#FC5E39] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading...</h2>
        </div>
      </div>
    }>
      <BookingSuccessContent />
    </Suspense>
  )
}
