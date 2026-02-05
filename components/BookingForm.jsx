"use client"
import { useState, useRef, useEffect } from "react"
import { MapPin, Users, CheckCircle, Loader2, Accessibility } from "lucide-react"
import { ADLaM_Display } from 'next/font/google'
import { LoadScript, Autocomplete, GoogleMap, DirectionsRenderer } from '@react-google-maps/api'

const adlamDisplay = ADLaM_Display({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000'
const GOOGLE_MAPS_LIBRARIES = ['places', 'geometry']

// Map container style - compact for viewport
const mapContainerStyle = {
  width: '100%',
  height: '100%'
}

const defaultCenter = {
  lat: -33.8688,
  lng: 151.2093 // Sydney
}

export const BookingForm = () => {
  const [step, setStep] = useState(1)
  const [isBooked, setIsBooked] = useState(false)

  // Form state
  const [form, setForm] = useState({
    pickup: "",              // Actual address for backend validation
    pickupDisplay: "",       // Display name for UI
    pickupLat: null,
    pickupLng: null,
    dropoff: "",             // Actual address for backend validation
    dropoffDisplay: "",      // Display name for UI
    dropoffLat: null,
    dropoffLng: null,
    vehicleId: "",      // NEW: Store MongoDB ObjectId
    vehicleName: "",    // NEW: Store vehicle name for display
    childSeat: false,
    wheelchair: false,
    name: "",
    email: "",
    phone: "",
    specialRequirements: "",
    payment: "card",
    bookingTime: "now",
    pickupDate: "",
    pickupTime: "",
    isTtssSelected: false,
    people: 1,
    bags: 0,
  })

  // API states
  const [fareData, setFareData] = useState(null)
  const [isCalculatingFare, setIsCalculatingFare] = useState(false)
  const [isCreatingBooking, setIsCreatingBooking] = useState(false)
  const [error, setError] = useState(null)
  const [isLocationOutsideSydney, setIsLocationOutsideSydney] = useState(false)

  // OTP states for cash payment
  const [showOtpInput, setShowOtpInput] = useState(false)
  const [otp, setOtp] = useState('')
  const [bookingId, setBookingId] = useState(null)
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false)
  const [resendTimer, setResendTimer] = useState(60)
  const [canResend, setCanResend] = useState(false)

  // Google Maps Autocomplete refs
  const pickupAutocompleteRef = useRef(null)
  const dropoffAutocompleteRef = useRef(null)

  // Map and directions state
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [map, setMap] = useState(null)

  // Calculate fare when both pickup and dropoff are filled (with debounce for manual typing)
  useEffect(() => {
    if (form.pickup && form.dropoff && form.pickup.length > 3 && form.dropoff.length > 3) {
      // Debounce: wait 2 seconds after user stops typing
      const timer = setTimeout(() => {
        if (!isCalculatingFare) {
          calculateFare()
        }
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [form.pickup, form.dropoff, form.childSeat, form.wheelchair, form.isTtssSelected, form.bookingTime, form.pickupDate, form.pickupTime])

  // Timer for resend OTP (1 minute)
  useEffect(() => {
    let interval
    if (showOtpInput && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [showOtpInput, resendTimer])

  const calculateFare = async () => {
    setIsCalculatingFare(true)
    setError(null)
    setIsLocationOutsideSydney(false)

    try {
      const response = await fetch(`${API_BASE_URL}/api/fare/calculate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pickup: form.pickup,
          dropoff: form.dropoff,
          pickupTime: formatPickupTime(), // V2: Send pickup time for day/night rate calculation
          childSeat: form.childSeat,
          wheelchair: form.wheelchair,
          isTtssSelected: form.isTtssSelected,
        }),
      })

      const data = await response.json()

      // Check if location is outside Sydney
      if (!response.ok || data.success === false) {
        const errorMessage = data.message || 'Failed to calculate fare'

        // Check if error is about Sydney location
        if (errorMessage.toLowerCase().includes('sydney')) {
          setIsLocationOutsideSydney(true)
          setError(errorMessage)
        } else {
          setError(errorMessage)
        }
        return
      }

      // V2 Response format:
      // {
      //   distanceKm: number,
      //   durationMinutes: number,
      //   vehicles: [
      //     {
      //       vehicleId: "60d5ec49...",
      //       vehicleName: "Sedan",
      //       passengerCapacity: 4,
      //       luggageCapacity: 2,
      //       baseFare: 50,
      //       distanceFare: 7,
      //       tollAmount: 5.50,
      //       airportSurcharge: 5,
      //       childSeatCharge: 0,
      //       wheelchairCharge: 0,
      //       totalFare: 67.50,
      //       isNightRate: true,
      //       pricePerKm: 3.50,
      //       minimumFareApplied: false
      //     }
      //   ]
      // }
      setFareData(data.data)
      setIsLocationOutsideSydney(false)
    } catch (err) {
      setError(err.message || 'Failed to calculate fare. Please try again.')
      console.error('Fare calculation error:', err)
    } finally {
      setIsCalculatingFare(false)
    }
  }

  const calculateRoute = async () => {
    if (!form.pickup || !form.dropoff || !window.google) return

    try {
      const directionsService = new window.google.maps.DirectionsService()
      const results = await directionsService.route({
        origin: form.pickup,
        destination: form.dropoff,
        travelMode: window.google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: false,
        avoidTolls: false // Show toll roads
      })
      setDirectionsResponse(results)
    } catch (error) {
      console.error('Error calculating route:', error)
      setDirectionsResponse(null)
    }
  }

  // Calculate route when locations change
  useEffect(() => {
    if (form.pickup && form.dropoff) {
      calculateRoute()
    } else {
      setDirectionsResponse(null)
    }
  }, [form.pickup, form.dropoff])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))

    // Reset fare data when locations or options change
    if (name === 'pickup' || name === 'dropoff' || name === 'childSeat' || name === 'wheelchair' || name === 'isTtssSelected') {
      setFareData(null)
      setIsLocationOutsideSydney(false)
    }

    // V2: If TTSS is selected, force payment method to CASH
    if (name === 'isTtssSelected' && checked) {
      setForm((prev) => ({
        ...prev,
        payment: 'cash'
      }))
    }
  }

  const onPickupLoad = (autocomplete) => {
    pickupAutocompleteRef.current = autocomplete
  }

  const onPickupPlaceChanged = () => {
    if (pickupAutocompleteRef.current !== null) {
      const place = pickupAutocompleteRef.current.getPlace()
      if (place.formatted_address && place.geometry) {
        // Store both: formatted_address for backend validation, name for UI display
        setForm(prev => ({
          ...prev,
          pickup: place.formatted_address,           // For backend (has NSW, Australia)
          pickupDisplay: place.name || place.formatted_address,  // For UI (user-friendly)
          pickupLat: place.geometry.location.lat(),
          pickupLng: place.geometry.location.lng()
        }))
        setFareData(null) // Reset fare data
      }
    }
  }

  const onDropoffLoad = (autocomplete) => {
    dropoffAutocompleteRef.current = autocomplete
  }

  const onDropoffPlaceChanged = () => {
    if (dropoffAutocompleteRef.current !== null) {
      const place = dropoffAutocompleteRef.current.getPlace()
      if (place.formatted_address && place.geometry) {
        // Store both: formatted_address for backend validation, name for UI display
        setForm(prev => ({
          ...prev,
          dropoff: place.formatted_address,          // For backend (has NSW, Australia)
          dropoffDisplay: place.name || place.formatted_address, // For UI (user-friendly)
          dropoffLat: place.geometry.location.lat(),
          dropoffLng: place.geometry.location.lng()
        }))
        setFareData(null) // Reset fare data
      }
    }
  }

  const selectVehicle = (vehicleId, vehicleName, passengerCapacity, luggageCapacity) => {
    setForm((prev) => ({
      ...prev,
      vehicleId,
      vehicleName,
      people: 1,
      bags: 0
    }))
  }

  const formatPickupTime = () => {
    let dateToFormat

    if (form.bookingTime === 'now') {
      // Current time + 5 minutes
      const now = new Date()
      now.setMinutes(now.getMinutes() + 5)
      dateToFormat = now
    } else {
      // Combine date and time
      const dateTimeString = `${form.pickupDate}T${form.pickupTime}:00`
      dateToFormat = new Date(dateTimeString)
    }

    // Adjust to send Wall Clock Time as UTC
    // This removes the browser's timezone offset from the timestamp so the backend receives the absolute time as UTC
    const timezoneOffset = dateToFormat.getTimezoneOffset() * 60000
    const adjustedDate = new Date(dateToFormat.getTime() - timezoneOffset)
    return adjustedDate.toISOString()
  }

  const createBooking = async () => {
    setIsCreatingBooking(true)
    setError(null)

    try {
      const bookingData = {
        pickup: form.pickup,
        pickupLat: form.pickupLat,
        pickupLng: form.pickupLng,
        dropoff: form.dropoff,
        dropoffLat: form.dropoffLat,
        dropoffLng: form.dropoffLng,
        pickupTime: formatPickupTime(),
        vehicleId: form.vehicleId,          // V2: REQUIRED - MongoDB ObjectId
        vehicleType: form.vehicleName,      // V2: Optional display name
        childSeat: form.childSeat,
        wheelchair: form.wheelchair,
        people: form.people,
        bags: form.bags,
        specialRequirements: form.specialRequirements,
        passengerName: form.name,
        passengerPhone: form.phone,
        passengerEmail: form.email,
        paymentMethod: form.payment,        // V2: card, cash, cabcharge
        isTtssSelected: form.isTtssSelected,
      }

      const response = await fetch(`${API_BASE_URL}/api/booking/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      })

      if (!response.ok) {
        throw new Error('Failed to create booking')
      }

      const { data } = await response.json()

      // If card payment, redirect to Stripe (NO OTP)
      if (form.payment === 'card' && data.checkoutUrl) {
        window.location.href = data.checkoutUrl
      } else {
        // V2: Cash, Cabcharge, or TTSS payment - OTP required
        setBookingId(data.bookingId || data.id)
        setShowOtpInput(true)
      }
    } catch (err) {
      setError(err.message || 'Failed to create booking. Please try again.')
      console.error('Booking creation error:', err)
    } finally {
      setIsCreatingBooking(false)
    }
  }

  const verifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP')
      return
    }

    setIsVerifyingOtp(true)
    setError(null)

    try {
      const response = await fetch(`${API_BASE_URL}/api/booking/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookingId: bookingId,
          otp: otp,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Invalid OTP')
      }

      const data = await response.json()

      // OTP verified successfully, redirect to success page with booking ID
      window.location.href = `/booking/success?booking_id=${bookingId}`
    } catch (err) {
      setError(err.message || 'Failed to verify OTP. Please try again.')
      console.error('OTP verification error:', err)
    } finally {
      setIsVerifyingOtp(false)
    }
  }

  const resendOtp = async () => {
    setError(null)

    try {
      const response = await fetch(`${API_BASE_URL}/api/booking/resend-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookingId: bookingId,
          phone: form.phone, // Send current phone number to backend for validation
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to resend OTP')
      }

      // Reset timer and disable resend button
      setOtp('')
      setResendTimer(60)
      setCanResend(false)
      setError('OTP resent successfully!')
      setTimeout(() => setError(null), 3000)
    } catch (err) {
      setError(err.message || 'Failed to resend OTP. Please try again.')
      console.error('Resend OTP error:', err)
    }
  }

  const handleStep1Submit = () => {
    if (!form.pickup || !form.dropoff || !form.vehicleId) {
      setError('Please fill in all required fields')
      return
    }
    setError(null)
    setStep(2)
  }

  const handleStep2Submit = () => {
    if (!form.name || !form.email || !form.phone) {
      setError('Please fill in all required fields')
      return
    }

    // Validate E.164 phone format
    const e164Regex = /^\+[1-9]\d{1,14}$/
    if (!e164Regex.test(form.phone)) {
      setError('Phone number must be in E.164 format (e.g., +61412345678)')
      return
    }

    setError(null)
    createBooking()
  }

  const Step1 = (
    <>
      <div className="space-y-2 mb-3">
        {/* Pickup Location */}
        <div className="relative">
          <div className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 z-10 text-gray-400">
            <MapPin className="w-5 h-5" />
          </div>
          <button
            type="button"
            onClick={() => {
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                  async (position) => {
                    const { latitude, longitude } = position.coords
                    try {
                      const geocoder = new window.google.maps.Geocoder()
                      const result = await geocoder.geocode({
                        location: { lat: latitude, lng: longitude }
                      })
                      if (result.results[0]) {
                        const address = result.results[0].formatted_address
                        setForm(prev => ({
                          ...prev,
                          pickup: address,           // For backend
                          pickupDisplay: address,    // For UI (formatted_address for geolocation)
                          pickupLat: latitude,
                          pickupLng: longitude
                        }))
                        setFareData(null)
                      }
                    } catch (error) {
                      console.error('Geocoding error:', error)
                      setError('Failed to get address from location')
                    }
                  },
                  (error) => {
                    console.error('Geolocation error:', error)
                    setError('Failed to get your location. Please enable location access.')
                  }
                )
              } else {
                setError('Geolocation is not supported by your browser')
              }
            }}
            className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 z-10 text-[#FC5E39] hover:text-[#e54d2e] transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"></path>
            </svg>
          </button>
          <Autocomplete
            onLoad={onPickupLoad}
            onPlaceChanged={onPickupPlaceChanged}
            options={{
              componentRestrictions: { country: 'au' },
              types: ['establishment', 'geocode'],
              bounds: {
                north: -33.578,
                south: -34.118,
                east: 151.343,
                west: 150.521
              },
              strictBounds: false,
              locationBias: {
                center: { lat: -33.8688, lng: 151.2093 },
                radius: 50000
              }
            }}
          >
            <input
              type="text"
              name="pickup"
              value={form.pickupDisplay || form.pickup}
              onChange={(e) => setForm(prev => ({
                ...prev,
                pickup: e.target.value,        // Backend address
                pickupDisplay: e.target.value  // Display name
              }))}
              placeholder="Enter pickup location"
              className="w-full bg-white rounded-full pl-10 md:pl-12 pr-10 py-2 md:py-3 text-xs md:text-base text-gray-700 placeholder:text-gray-400 outline-none border-2 border-orange-300/50 focus:border-[#FF6347] transition-colors"
            />
          </Autocomplete>
        </div>

        {/* Dropoff Location */}
        <div className="relative">
          <div className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 z-10 text-gray-400">
            <MapPin className="w-5 h-5" />
          </div>
          <button
            type="button"
            onClick={() => {
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                  async (position) => {
                    const { latitude, longitude } = position.coords
                    try {
                      const geocoder = new window.google.maps.Geocoder()
                      const result = await geocoder.geocode({
                        location: { lat: latitude, lng: longitude }
                      })
                      if (result.results[0]) {
                        const address = result.results[0].formatted_address
                        setForm(prev => ({
                          ...prev,
                          dropoff: address,          // For backend
                          dropoffDisplay: address,   // For UI (formatted_address for geolocation)
                          dropoffLat: latitude,
                          dropoffLng: longitude
                        }))
                        setFareData(null)
                      }
                    } catch (error) {
                      console.error('Geocoding error:', error)
                      setError('Failed to get address from location')
                    }
                  },
                  (error) => {
                    console.error('Geolocation error:', error)
                    setError('Failed to get your location. Please enable location access.')
                  }
                )
              } else {
                setError('Geolocation is not supported by your browser')
              }
            }}
            className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 z-10 text-[#FC5E39] hover:text-[#e54d2e] transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"></path>
            </svg>
          </button>
          <Autocomplete
            onLoad={onDropoffLoad}
            onPlaceChanged={onDropoffPlaceChanged}
            options={{
              componentRestrictions: { country: 'au' },
              types: ['establishment', 'geocode'],
              bounds: {
                north: -33.578,
                south: -34.118,
                east: 151.343,
                west: 150.521
              },
              strictBounds: false,
              locationBias: {
                center: { lat: -33.8688, lng: 151.2093 },
                radius: 50000
              }
            }}
          >
            <input
              type="text"
              name="dropoff"
              value={form.dropoffDisplay || form.dropoff}
              onChange={(e) => setForm(prev => ({
                ...prev,
                dropoff: e.target.value,        // Backend address
                dropoffDisplay: e.target.value  // Display name
              }))}
              placeholder="Enter destination"
              className="w-full bg-white rounded-full pl-10 md:pl-12 pr-10 py-2 md:py-3 text-xs md:text-base text-gray-700 placeholder:text-gray-400 outline-none border-2 border-orange-300/50 focus:border-[#FF6347] transition-colors"
            />
          </Autocomplete>
        </div>

        {/* Wheelchair and Child Seat - Horizontal */}
        <div className="flex gap-2">
          <label className="flex-1 flex items-center gap-1.5 bg-white rounded-full px-2 py-2 md:px-4 md:py-3 border-2 border-orange-300/50 cursor-pointer hover:border-[#FF6347] transition-colors">
            <input
              type="checkbox"
              name="wheelchair"
              checked={form.wheelchair}
              onChange={handleChange}
              className="w-3.5 h-3.5 md:w-4 md:h-4 accent-[#FC5E39]"
            />
            <Accessibility className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
            <span className="text-xs md:text-base text-gray-700">Wheelchair</span>
          </label>
          <label className="flex-1 flex items-center gap-1.5 bg-white rounded-full px-2 py-2 md:px-4 md:py-3 border-2 border-orange-300/50 cursor-pointer hover:border-[#FF6347] transition-colors">
            <input
              type="checkbox"
              name="childSeat"
              checked={form.childSeat}
              onChange={handleChange}
              className="w-3.5 h-3.5 md:w-4 md:h-4 accent-[#FC5E39]"
            />

            <img
              src="/assets/icons/baby-seat.png"
              alt="Child Seat"
              className="w-4 h-4 md:w-5 md:h-5 object-contain grayscale opacity-80"
            />
            <span className="text-xs md:text-base text-gray-700">Child Seat</span>
          </label>
        </div>

        {/* Show loading or vehicles after locations filled */}
        {form.pickup && form.dropoff && (
          <>
            <div className="mt-2 mb-3 flex items-center justify-between">
              <p className={`text-[10px] md:text-xs text-gray-600 font-medium ${fareData ? 'opacity-100' : 'opacity-0'}`}>Select your vehicle:</p>

              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    name="isTtssSelected"
                    checked={form.isTtssSelected}
                    onChange={handleChange}
                    className="w-4 h-4 md:w-5 md:h-5 accent-[#FC5E39] rounded border-gray-300 focus:ring-[#FC5E39]"
                  />
                </div>
                <span className="text-sm md:text-base text-gray-700 font-medium">
                  I want to pay via TTSS
                </span>
                <div className="relative group/tooltip ml-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 hover:text-gray-600 transition-colors cursor-help">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 p-2 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-50 text-center pointer-events-none">
                    Taxi Transport Subsidy Scheme (TTSS) provides discounted fares for eligible passengers.
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                  </div>
                </div>
              </label>
            </div>

            {isCalculatingFare ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-[#FC5E39]" />
                <span className="ml-2 text-gray-600">Calculating fare...</span>
              </div>
            ) : fareData ? (
              <>
                {/* Vehicle Selection */}
                <div className="space-y-1 md:space-y-2">
                  {/* <p className="text-[10px] md:text-xs text-gray-600 font-medium">Select your vehicle:</p> */}
                  {fareData.vehicles && fareData.vehicles.length > 0 ? (
                    fareData.vehicles.map((vehicle) => (
                      <button
                        key={vehicle.vehicleId}
                        type="button"
                        onClick={() => selectVehicle(vehicle.vehicleId, vehicle.vehicleName, vehicle.passengerCapacity, vehicle.luggageCapacity)}
                        className={`w-full flex items-center justify-between gap-1.5 sm:gap-3 p-1.5 sm:p-2 md:p-3 rounded-xl md:rounded-2xl transition-all border-2 ${form.vehicleId === vehicle.vehicleId
                          ? 'bg-orange-100 border-[#FC5E39]'
                          : 'bg-white border-orange-300/50 hover:border-[#FF6347]'
                          }`}
                      >
                        {/* Section 1: Image + Vehicle Info */}
                        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-shrink">
                          <div className="w-10 h-7 sm:w-12 sm:h-8 md:w-14 md:h-9 shrink-0 rounded-lg overflow-hidden">
                            <img
                              src={
                                vehicle.vehicleName === 'Sedan' ? '/assets/images/sedan-removebg-preview.png' :
                                  vehicle.vehicleName === 'SUV' ? '/assets/images/suv-removebg-preview.png' :
                                    '/assets/images/11_seater-removebg-preview.png'
                              }
                              alt={vehicle.vehicleName}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="text-left min-w-0">
                            <div className="font-bold text-gray-900 text-[10px] sm:text-[11px] md:text-sm truncate">{vehicle.vehicleName}</div>
                            <div className="flex items-center gap-0.5 text-gray-500 text-[8px] sm:text-[9px] md:text-xs">
                              <Users className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 shrink-0" />
                              <span className="truncate">Up to {vehicle.passengerCapacity}</span>
                            </div>
                            {vehicle.isNightRate && (
                              <div className="text-[7px] sm:text-[8px] md:text-[10px] text-orange-600 font-medium">
                                🌙 Night rate
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Section 2: People & Bags Controls (Vertical) */}
                        <div className="flex flex-col items-start justify-center gap-1 shrink-0">
                          {/* People Control */}
                          <div className="flex items-center gap-0.5">
                            <span className="text-[7px] sm:text-[8px] md:text-xs text-gray-600 font-medium w-8 sm:w-10 md:w-14">People:</span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                if (form.vehicleId === vehicle.vehicleId && form.people > 1) {
                                  setForm(prev => ({ ...prev, people: prev.people - 1 }))
                                }
                              }}
                              disabled={form.vehicleId !== vehicle.vehicleId || form.people <= 1}
                              className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex items-center justify-center bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed text-gray-700 rounded-full text-[10px] sm:text-xs md:text-sm font-bold transition-colors"
                            >
                              −
                            </button>
                            <span className="text-[10px] sm:text-xs md:text-sm font-bold text-gray-900 w-3 sm:w-4 md:w-6 text-center">
                              {form.vehicleId === vehicle.vehicleId ? form.people : 1}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                if (form.vehicleId === vehicle.vehicleId && form.people < vehicle.passengerCapacity) {
                                  setForm(prev => ({ ...prev, people: prev.people + 1 }))
                                }
                              }}
                              disabled={form.vehicleId !== vehicle.vehicleId || form.people >= vehicle.passengerCapacity}
                              className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex items-center justify-center bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed text-gray-700 rounded-full text-[10px] sm:text-xs md:text-sm font-bold transition-colors"
                            >
                              +
                            </button>
                          </div>

                          {/* Bags Control */}
                          <div className="flex items-center gap-0.5">
                            <span className="text-[7px] sm:text-[8px] md:text-xs text-gray-600 font-medium w-8 sm:w-10 md:w-14">Bags:</span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                if (form.vehicleId === vehicle.vehicleId && form.bags > 0) {
                                  setForm(prev => ({ ...prev, bags: prev.bags - 1 }))
                                }
                              }}
                              disabled={form.vehicleId !== vehicle.vehicleId || form.bags <= 0}
                              className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex items-center justify-center bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed text-gray-700 rounded-full text-[10px] sm:text-xs md:text-sm font-bold transition-colors"
                            >
                              −
                            </button>
                            <span className="text-[10px] sm:text-xs md:text-sm font-bold text-gray-900 w-3 sm:w-4 md:w-6 text-center">
                              {form.vehicleId === vehicle.vehicleId ? form.bags : 0}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                if (form.vehicleId === vehicle.vehicleId && form.bags < vehicle.luggageCapacity) {
                                  setForm(prev => ({ ...prev, bags: prev.bags + 1 }))
                                }
                              }}
                              disabled={form.vehicleId !== vehicle.vehicleId || form.bags >= vehicle.luggageCapacity}
                              className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex items-center justify-center bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed text-gray-700 rounded-full text-[10px] sm:text-xs md:text-sm font-bold transition-colors"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Section 3: Fare, Distance & Time */}
                        <div className="text-right flex flex-col items-end shrink-0">
                          <div className="flex flex-col items-start font-bold text-[7px] sm:text-[8px] md:text-xs mt-0.5">
                            <div className="font-bold text-[#FC5E39] text-[10px] sm:text-sm md:text-base">${vehicle.totalFare.toFixed(2)}</div>
                            <div>DIS: {fareData.distanceKm} km</div>
                            <div>ETA: {fareData.durationMinutes} min</div>
                          </div>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="text-center text-gray-500 text-sm py-4">
                      No vehicles available for this route
                    </div>
                  )}
                </div>
              </>
            ) : null}
          </>
        )}

        {/* TTSS Selection */}
        <div className="mt-2 mb-3 flex items-center justify-between">

        </div>

        {/* Book Now / Later */}
        <div className="flex gap-3 md:gap-6 items-center justify-center pt-1 md:pt-2">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="bookingTime"
              value="now"
              checked={form.bookingTime === "now"}
              onChange={handleChange}
              className="hidden"
            />
            <span className={`w-4 h-4 md:w-5 md:h-5 rounded-full border-2 flex items-center justify-center mr-1 md:mr-2 ${form.bookingTime === "now" ? 'border-green-500' : 'border-gray-400'}`}>
              {form.bookingTime === "now" && <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-green-500"></span>}
            </span>
            <span className="text-gray-900 font-bold text-[11px] md:text-base">Book for now</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="bookingTime"
              value="later"
              checked={form.bookingTime === "later"}
              onChange={handleChange}
              className="hidden"
            />
            <span className={`w-4 h-4 md:w-5 md:h-5 rounded-full border-2 flex items-center justify-center mr-1 md:mr-2 ${form.bookingTime === "later" ? 'border-green-500' : 'border-gray-400'}`}>
              {form.bookingTime === "later" && <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-green-500"></span>}
            </span>
            <span className="text-gray-900 font-bold text-[11px] md:text-base">Book for later</span>
          </label>
        </div>

        {/* Date and Time Pickers */}
        {form.bookingTime === "later" && (
          <div className="flex gap-2">
            <div className="flex-1">
              <input
                type="date"
                name="pickupDate"
                value={form.pickupDate}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full bg-white rounded-2xl px-2 py-1.5 md:px-3 md:py-2.5 text-xs md:text-sm text-gray-700 outline-none border-2 border-orange-300/50 focus:border-[#FF6347] transition-colors"
              />
            </div>
            <div className="flex-1">
              <input
                type="time"
                name="pickupTime"
                value={form.pickupTime}
                onChange={handleChange}
                className="w-full bg-white rounded-2xl px-2 py-1.5 md:px-3 md:py-2.5 text-xs md:text-sm text-gray-700 outline-none border-2 border-orange-300/50 focus:border-[#FF6347] transition-colors"
              />
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm">
          {error}
        </div>
      )}

      <button
        className="w-full bg-[#FC5E39] hover:bg-[#e54d2e] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm md:text-lg rounded-full py-2.5 md:py-3.5 transition-colors shadow-lg mb-2"
        onClick={handleStep1Submit}
        disabled={!form.pickup || !form.dropoff || !form.vehicleId || isCalculatingFare || isLocationOutsideSydney || !fareData}
        type="button"
      >
        Continue to Booking
      </button>
    </>
  )

  // OTP Input Screen - Replaces Step 2 when OTP is sent (for cash, cabcharge, ttss)
  const OtpScreen = (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <div className="w-20 h-20 bg-[#FC5E39]/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-4xl">📱</span>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Booking</h3>
        <p className="text-sm text-gray-600">
          We've sent a 6-digit OTP to
        </p>
        <p className="text-base font-semibold text-[#FC5E39] mt-1">{form.phone}</p>
        <p className="text-xs text-gray-500 mt-2">
          Payment method: {form.payment.charAt(0).toUpperCase() + form.payment.slice(1)}
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
          Enter OTP Code
        </label>
        <input
          type="text"
          maxLength="6"
          value={otp}
          onChange={(e) => {
            const value = e.target.value.replace(/[^0-9]/g, '')
            setOtp(value)
          }}
          placeholder="000000"
          className="w-full px-4 py-4 text-center text-3xl font-bold tracking-widest border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-[#FC5E39] focus:ring-2 focus:ring-[#FC5E39]/20 transition-all"
          disabled={isVerifyingOtp}
          autoFocus
        />
      </div>

      <button
        className="w-full bg-[#FC5E39] hover:bg-[#e54d2e] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-full py-4 text-base transition-colors shadow-lg flex items-center justify-center gap-2"
        onClick={verifyOtp}
        disabled={isVerifyingOtp || otp.length !== 6}
        type="button"
      >
        {isVerifyingOtp ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Verifying...
          </>
        ) : (
          'Verify & Confirm Booking'
        )}
      </button>

      <div className="text-center">
        {canResend ? (
          <p className="text-gray-600 text-sm">
            Didn't receive OTP?{' '}
            <button
              className="text-gray-600 hover:text-[#FC5E39] font-semibold transition-colors cursor-pointer underline"
              onClick={resendOtp}
              type="button"
            >
              Resend
            </button>
          </p>
        ) : (
          <p className="text-gray-500 text-sm">
            Resend OTP in <span className="font-semibold text-[#FC5E39]">{resendTimer}s</span>
          </p>
        )}
      </div>

      <button
        className="w-full text-gray-600 hover:text-gray-800 font-medium text-sm py-2 transition-colors"
        onClick={() => {
          // Reset OTP screen and allow user to change phone number
          setShowOtpInput(false)
          setOtp('')
          setBookingId(null) // Clear old booking ID so new booking is created
          setResendTimer(60)
          setCanResend(false)
          setError(null)
          setIsCreatingBooking(false)
        }}
        disabled={isVerifyingOtp}
        type="button"
      >
        ← Change Phone Number
      </button>
    </div>
  )

  const Step2 = (
    <>
      <div className="space-y-2 mb-3">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full bg-white rounded-full px-3 py-2 md:px-4 md:py-3 text-xs md:text-base text-gray-700 placeholder:text-gray-400 outline-none border-2 border-orange-300/50 focus:border-[#FF6347] transition-colors"
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email Address"
          className="w-full bg-white rounded-full px-3 py-2 md:px-4 md:py-3 text-xs md:text-base text-gray-700 placeholder:text-gray-400 outline-none border-2 border-orange-300/50 focus:border-[#FF6347] transition-colors"
        />
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number (e.g., +61412345678)"
          className="w-full bg-white rounded-full px-3 py-2 md:px-4 md:py-3 text-xs md:text-base text-gray-700 placeholder:text-gray-400 outline-none border-2 border-orange-300/50 focus:border-[#FF6347] transition-colors"
        />
        <textarea
          name="specialRequirements"
          value={form.specialRequirements}
          onChange={handleChange}
          placeholder="Special note to driver (optional)"
          rows={2}
          className="w-full bg-white rounded-3xl px-3 py-2 md:px-4 md:py-3 text-xs md:text-base text-gray-700 placeholder:text-gray-400 outline-none border-2 border-orange-300/50 focus:border-[#FF6347] transition-colors resize-none"
        />
        <div className="flex gap-2 p-1.5 md:p-2 bg-gray-50/50 rounded-2xl border border-gray-100">
          {form.isTtssSelected ? (
            // TTSS-specific payment option
            <label className="flex-1 flex items-center justify-center py-1.5 md:py-2 cursor-default">
              <input
                type="radio"
                name="payment"
                value="cash"
                checked={true}
                readOnly
                className="mr-1.5 md:mr-2 accent-[#FC5E39]"
              />
              <span className="text-gray-700 font-medium text-xs md:text-sm">Driver will collect TTSS payment</span>
            </label>
          ) : (
            // Normal payment options
            <>
              <label className="flex-1 flex items-center justify-center py-1.5 md:py-2 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="cash"
                  checked={form.payment === "cash"}
                  onChange={handleChange}
                  className="mr-1.5 md:mr-2 accent-[#FC5E39]"
                />
                <span className="text-gray-700 font-medium text-xs md:text-sm">Cash</span>
              </label>
              <label className="flex-1 flex items-center justify-center py-1.5 md:py-2 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={form.payment === "card"}
                  onChange={handleChange}
                  className="mr-1.5 md:mr-2 accent-[#FC5E39]"
                />
                <span className="text-gray-700 font-medium text-xs md:text-sm">Card</span>
              </label>
              <label className="flex-1 flex items-center justify-center py-1.5 md:py-2 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="cabcharge"
                  checked={form.payment === "cabcharge"}
                  onChange={handleChange}
                  className="mr-1.5 md:mr-2 accent-[#FC5E39]"
                />
                <span className="text-gray-700 font-medium text-xs md:text-sm">Cabcharge</span>
              </label>
            </>
          )}
        </div>
      </div>

      {error && (
        <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm">
          {error}
        </div>
      )}

      <div className="flex gap-2">
        <button
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-full py-2.5 md:py-3.5 text-xs md:text-base transition-colors shadow mb-2"
          onClick={() => {
            setStep(1)
            setError(null)
          }}
          type="button"
        >
          Back
        </button>
        <button
          className="flex-1 bg-[#FC5E39] hover:bg-[#e54d2e] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-full py-2.5 md:py-3.5 text-xs md:text-base transition-colors shadow mb-2 flex items-center justify-center gap-2"
          onClick={handleStep2Submit}
          disabled={isCreatingBooking || !form.name || !form.email || !form.phone}
          type="button"
        >
          {isCreatingBooking ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Processing...
            </>
          ) : (
            (() => {
              const selectedVehicle = fareData?.vehicles?.find(v => v.vehicleId === form.vehicleId)
              const totalFare = selectedVehicle?.totalFare || 0
              return `Book Now - $${totalFare.toFixed(2)}`
            })()
          )}
        </button>
      </div>
    </>
  )

  if (isBooked) {
    return (
      <div className="w-full max-w-[435px] md:max-w-[480px] bg-white rounded-[40px] overflow-hidden shadow-2xl p-6 ">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
          <p className="text-gray-600 mb-6">
            Your {form.vehicleName} taxi is on the way.
          </p>
          <div className="w-full space-y-2 text-left bg-gray-50 p-4 rounded-2xl mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">From:</span>
              <span className="font-semibold text-gray-900 text-right max-w-[200px] truncate">{form.pickup}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">To:</span>
              <span className="font-semibold text-gray-900 text-right max-w-[200px] truncate">{form.dropoff}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Vehicle:</span>
              <span className="font-semibold text-gray-900">{form.vehicleName} Taxi</span>
            </div>
            {fareData && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Total Fare:</span>
                <span className="font-bold text-[#FC5E39]">
                  ${(() => {
                    const selectedVehicle = fareData.vehicles?.find(v => v.vehicleId === form.vehicleId)
                    return (selectedVehicle?.totalFare || 0).toFixed(2)
                  })()}
                </span>
              </div>
            )}
          </div>
          <button
            onClick={() => {
              setIsBooked(false)
              setStep(1)
              setForm({
                pickup: "",
                pickupLat: null,
                pickupLng: null,
                dropoff: "",
                dropoffLat: null,
                dropoffLng: null,
                vehicleId: "",
                vehicleName: "",
                childSeat: false,
                wheelchair: false,
                name: "",
                email: "",
                phone: "",
                specialRequirements: "",
                payment: "card",
                isTtssSelected: false,
                bookingTime: "now",
                pickupDate: "",
                pickupTime: "",
              })
              setFareData(null)
              setError(null)
            }}
            className="w-full bg-[#FC5E39] text-white font-bold py-3 rounded-full shadow-lg hover:bg-[#e54d2e] transition-colors"
          >
            Book Another Ride
          </button>
        </div>
      </div>
    )
  }

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={GOOGLE_MAPS_LIBRARIES}>
      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-4 md:items-start items-center">
        {/* Booking Form */}
        <div className={`w-full ${form.pickup && form.dropoff && form.pickupLat && form.dropoffLat ? 'lg:w-[55%]' : 'lg:w-full max-w-[480px]'} bg-white/70 backdrop-blur-[1px] sm:rounded-[40px] rounded-3xl p-5 md:p-8 shadow-2xl`}>
          <div className="mb-2">
            <h2 className={`text-lg md:text-2xl font-bold text-gray-900 mb-0.5 ${adlamDisplay.className}`}>
              Book a Taxi in Sydney
            </h2>
            <p className="text-xs md:text-base text-gray-800">
              Fixed price rides. No surge pricing.
            </p>
          </div>

          {step === 1 && Step1}
          {step === 2 && !showOtpInput && Step2}
          {step === 2 && showOtpInput && OtpScreen}

          {/* Trust Badge */}
          <div className="hidden md:flex items-center justify-center gap-2 text-sm text-gray-600 mt-2">
            <span className="text-gray-500">Trusted by</span>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4 text-[#FC5E39]" />
              <span className="font-semibold text-gray-900">50K+ riders</span>
            </div>
            <span className="text-gray-400">•</span>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-semibold text-gray-900">4.9 rating</span>
            </div>
          </div>
        </div>

        {/* Map Preview - Shows when BOTH locations are entered */}
        {form.pickup && form.dropoff && form.pickupLat && form.dropoffLat && (
          <div className="w-full lg:w-[45%] bg-white rounded-3xl overflow-hidden shadow-2xl h-[300px] lg:h-[500px] lg:sticky lg:top-24">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={defaultCenter}
              zoom={12}
              onLoad={(map) => setMap(map)}
              options={{
                zoomControl: true,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
              }}
            >
              {directionsResponse && (
                <DirectionsRenderer
                  directions={directionsResponse}
                  options={{
                    suppressMarkers: false,
                    polylineOptions: {
                      strokeColor: '#FC5E39',
                      strokeWeight: 5,
                      strokeOpacity: 0.8,
                    },
                  }}
                />
              )}
            </GoogleMap>
          </div>
        )}
      </div>
    </LoadScript>
  )
}
