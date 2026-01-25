"use client"
import { useState, useRef, useEffect } from "react"
import { MapPin, Car, ChevronDown, Users, CheckCircle, Loader2, RockingChair, Baby } from "lucide-react"
import Image from "next/image"
import { ADLaM_Display } from 'next/font/google'
import { LoadScript, Autocomplete } from '@react-google-maps/api'
import { VehicleType, VehicleDisplayNames, VehicleDescriptions } from '../utils/enums'

const adlamDisplay = ADLaM_Display({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000'
const GOOGLE_MAPS_LIBRARIES = ['places']

export const BookingForm = () => {
  const [step, setStep] = useState(1)
  const [isBooked, setIsBooked] = useState(false)

  // Form state
  const [form, setForm] = useState({
    pickup: "",
    dropoff: "",
    vehicle: "",
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
  })

  // API states
  const [fareData, setFareData] = useState(null)
  console.log("🚀 ~ BookingForm ~ fareData:", fareData)
  const [isCalculatingFare, setIsCalculatingFare] = useState(false)
  const [isCreatingBooking, setIsCreatingBooking] = useState(false)
  const [error, setError] = useState(null)

  // Google Maps Autocomplete refs
  const pickupAutocompleteRef = useRef(null)
  const dropoffAutocompleteRef = useRef(null)

  // Calculate fare when both pickup and dropoff are filled
  useEffect(() => {
    if (form.pickup && form.dropoff && !fareData && !isCalculatingFare) {
      calculateFare()
    }
  }, [form.pickup, form.dropoff, form.childSeat, form.wheelchair])

  const calculateFare = async () => {
    setIsCalculatingFare(true)
    setError(null)

    try {
      const response = await fetch(`${API_BASE_URL}/api/fare/calculate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pickup: form.pickup,
          dropoff: form.dropoff,
          childSeat: form.childSeat,
          wheelchair: form.wheelchair,
          // Note: No vehicleType sent - backend returns all vehicles with pricing
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to calculate fare')
      }

      const data = await response.json()
      // Expected response format:
      // {
      //   distance_km: number,
      //   duration_minutes: number,
      //   toll_amount: number,
      //   airport_surcharge: number,
      //   vehicles: [
      //     { vehicleType: "Sedan", base_fare: number, total_fare: number },
      //     { vehicleType: "SUV", base_fare: number, total_fare: number },
      //     { vehicleType: "Van", base_fare: number, total_fare: number }
      //   ]
      // }
      setFareData(data.data)
    } catch (err) {
      setError(err.message || 'Failed to calculate fare. Please try again.')
      console.error('Fare calculation error:', err)
    } finally {
      setIsCalculatingFare(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))

    // Reset fare data when locations or options change
    if (name === 'pickup' || name === 'dropoff' || name === 'childSeat' || name === 'wheelchair') {
      setFareData(null)
    }
  }

  const onPickupLoad = (autocomplete) => {
    pickupAutocompleteRef.current = autocomplete
  }

  const onPickupPlaceChanged = () => {
    if (pickupAutocompleteRef.current !== null) {
      const place = pickupAutocompleteRef.current.getPlace()
      if (place.formatted_address) {
        setForm(prev => ({ ...prev, pickup: place.formatted_address }))
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
      if (place.formatted_address) {
        setForm(prev => ({ ...prev, dropoff: place.formatted_address }))
        setFareData(null) // Reset fare data
      }
    }
  }

  const selectVehicle = (vehicleType) => {
    setForm((prev) => ({ ...prev, vehicle: vehicleType }))
  }

  const formatPickupTime = () => {
    if (form.bookingTime === 'now') {
      // Current time + 15 minutes
      const now = new Date()
      now.setMinutes(now.getMinutes() + 15)
      return now.toISOString()
    } else {
      // Combine date and time into ISO 8601 format
      const dateTimeString = `${form.pickupDate}T${form.pickupTime}:00`
      return new Date(dateTimeString).toISOString()
    }
  }

  const createBooking = async () => {
    setIsCreatingBooking(true)
    setError(null)

    try {
      const bookingData = {
        pickup: form.pickup,
        dropoff: form.dropoff,
        pickupTime: formatPickupTime(),
        vehicleType: form.vehicle,
        childSeat: form.childSeat,
        wheelchair: form.wheelchair,
        specialRequirements: form.specialRequirements,
        passengerName: form.name,
        passengerPhone: form.phone,
        passengerEmail: form.email,
        paymentMethod: form.payment,
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

      const data = await response.json()

      // If card payment, redirect to Stripe
      if (form.payment === 'card' && data.checkoutUrl) {
        window.location.href = data.checkoutUrl
      } else {
        // Cash payment confirmed
        setIsBooked(true)
      }
    } catch (err) {
      setError(err.message || 'Failed to create booking. Please try again.')
      console.error('Booking creation error:', err)
    } finally {
      setIsCreatingBooking(false)
    }
  }

  const handleStep1Submit = () => {
    if (!form.pickup || !form.dropoff || !form.vehicle) {
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

    // Validate phone format (basic check for + prefix)
    if (!form.phone.startsWith('+')) {
      setError('Phone number must include country code (e.g., +61412345678)')
      return
    }

    setError(null)
    createBooking()
  }

  const Step1 = (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={GOOGLE_MAPS_LIBRARIES}>
      <div className="space-y-3 mb-4">
        {/* Pickup Location */}
        <div className="relative">
          <div className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
            <MapPin className="w-5 h-5 text-gray-700" />
          </div>
          <Autocomplete
            onLoad={onPickupLoad}
            onPlaceChanged={onPickupPlaceChanged}
            options={{
              componentRestrictions: { country: 'au' },
              types: ['address']
            }}
          >
            <input
              type="text"
              name="pickup"
              value={form.pickup}
              onChange={(e) => setForm(prev => ({ ...prev, pickup: e.target.value }))}
              placeholder="Enter pickup location"
              className="w-full bg-white rounded-full pl-11 md:pl-12 pr-4 py-3 text-sm md:text-base text-gray-700 placeholder:text-gray-400 outline-none border-2 border-orange-300/50 focus:border-[#FF6347] transition-colors"
            />
          </Autocomplete>
        </div>

        {/* Dropoff Location */}
        <div className="relative">
          <div className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
            <MapPin className="w-5 h-5 text-gray-700" />
          </div>
          <Autocomplete
            onLoad={onDropoffLoad}
            onPlaceChanged={onDropoffPlaceChanged}
            options={{
              componentRestrictions: { country: 'au' },
              types: ['address']
            }}
          >
            <input
              type="text"
              name="dropoff"
              value={form.dropoff}
              onChange={(e) => setForm(prev => ({ ...prev, dropoff: e.target.value }))}
              placeholder="Enter destination"
              className="w-full bg-white rounded-full pl-11 md:pl-12 pr-4 py-3 text-sm md:text-base text-gray-700 placeholder:text-gray-400 outline-none border-2 border-orange-300/50 focus:border-[#FF6347] transition-colors"
            />
          </Autocomplete>
        </div>

        {/* Wheelchair and Child Seat - Horizontal */}
        <div className="flex gap-3">
          <label className="flex-1 flex items-center gap-2 bg-white rounded-full px-4 py-3 border-2 border-orange-300/50 cursor-pointer hover:border-[#FF6347] transition-colors">
            <input
              type="checkbox"
              name="wheelchair"
              checked={form.wheelchair}
              onChange={handleChange}
              className="w-4 h-4 accent-[#FC5E39]"
            />
            <RockingChair className="w-5 h-5 text-gray-600" />
            <span className="text-sm md:text-base text-gray-700">Wheelchair</span>
          </label>
          <label className="flex-1 flex items-center gap-2 bg-white rounded-full px-4 py-3 border-2 border-orange-300/50 cursor-pointer hover:border-[#FF6347] transition-colors">
            <input
              type="checkbox"
              name="childSeat"
              checked={form.childSeat}
              onChange={handleChange}
              className="w-4 h-4 accent-[#FC5E39]"
            />
            <Baby className="w-5 h-5 text-gray-600" />
            <span className="text-sm md:text-base text-gray-700">Child Seat</span>
          </label>
        </div>

        {/* Show loading or vehicles after locations filled */}
        {form.pickup && form.dropoff && (
          <>
            {isCalculatingFare ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-[#FC5E39]" />
                <span className="ml-2 text-gray-600">Calculating fare...</span>
              </div>
            ) : fareData ? (
              <>
                {/* Trip Info */}
                <div className="bg-orange-50 rounded-2xl p-3 text-sm">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">Distance:</span>
                    <span className="font-bold text-gray-900">{fareData.distanceKm} km</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-bold text-gray-900">{fareData.durationMinutes} min</span>
                  </div>
                  {fareData.toll_amount > 0 && (
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-600">Tolls:</span>
                      <span className="font-bold text-gray-900">${fareData.toll_amount.toFixed(2)}</span>
                    </div>
                  )}
                  {fareData.airport_surcharge > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Airport Surcharge:</span>
                      <span className="font-bold text-gray-900">${fareData.airport_surcharge.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                {/* Vehicle Selection */}
                <div className="space-y-2">
                  <p className="text-xs text-gray-600 font-medium">Select your vehicle:</p>
                  {fareData.vehicles && fareData.vehicles.length > 0 ? (
                    fareData.vehicles.map((vehicle) => (
                      <button
                        key={vehicle.vehicleType}
                        type="button"
                        onClick={() => selectVehicle(vehicle.vehicleType)}
                        className={`w-full flex items-center p-3 rounded-2xl transition-all border-2 ${form.vehicle === vehicle.vehicleType
                            ? 'bg-orange-100 border-[#FC5E39]'
                            : 'bg-white border-orange-300/50 hover:border-[#FF6347]'
                          }`}
                      >
                        <div className="w-16 h-10 shrink-0 rounded-lg overflow-hidden mr-3">
                          <img
                            src={
                              vehicle.vehicleType === VehicleType.SEDAN ? '/assets/images/sedan-removebg-preview.png' :
                                vehicle.vehicleType === VehicleType.SUV ? '/assets/images/suv-removebg-preview.png' :
                                  '/assets/images/11_seater-removebg-preview.png'
                            }
                            alt={VehicleDisplayNames[vehicle.vehicleType]}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-bold text-gray-900 text-sm">{VehicleDisplayNames[vehicle.vehicleType]}</div>
                          <div className="flex items-center gap-1 text-gray-500 text-xs mt-0.5">
                            <Users className="w-3 h-3" />
                            {VehicleDescriptions[vehicle.vehicleType]}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-[#FC5E39] text-base">${vehicle.totalFare.toFixed(2)}</div>
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

        {/* Book Now / Later */}
        <div className="flex gap-6 items-center justify-center pt-2">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="bookingTime"
              value="now"
              checked={form.bookingTime === "now"}
              onChange={handleChange}
              className="hidden"
            />
            <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-2 ${form.bookingTime === "now" ? 'border-green-500' : 'border-gray-400'}`}>
              {form.bookingTime === "now" && <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>}
            </span>
            <span className="text-gray-900 font-bold text-sm md:text-base">Book for now</span>
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
            <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-2 ${form.bookingTime === "later" ? 'border-green-500' : 'border-gray-400'}`}>
              {form.bookingTime === "later" && <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>}
            </span>
            <span className="text-gray-900 font-bold text-sm md:text-base">Book for later</span>
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
                className="w-full bg-white rounded-2xl px-3 py-2.5 text-sm text-gray-700 outline-none border-2 border-orange-300/50 focus:border-[#FF6347] transition-colors"
              />
            </div>
            <div className="flex-1">
              <input
                type="time"
                name="pickupTime"
                value={form.pickupTime}
                onChange={handleChange}
                className="w-full bg-white rounded-2xl px-3 py-2.5 text-sm text-gray-700 outline-none border-2 border-orange-300/50 focus:border-[#FF6347] transition-colors"
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
        className="w-full bg-[#FC5E39] hover:bg-[#e54d2e] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-base md:text-lg rounded-full py-3 md:py-3.5 transition-colors shadow-lg mb-3"
        onClick={handleStep1Submit}
        disabled={!form.pickup || !form.dropoff || !form.vehicle || isCalculatingFare}
        type="button"
      >
        Book Taxi Now
      </button>
    </LoadScript>
  )

  const Step2 = (
    <>
      <div className="space-y-3 mb-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full bg-white rounded-full px-4 py-3 text-sm md:text-base text-gray-700 placeholder:text-gray-400 outline-none border-2 border-orange-300/50 focus:border-[#FF6347] transition-colors"
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email Address"
          className="w-full bg-white rounded-full px-4 py-3 text-sm md:text-base text-gray-700 placeholder:text-gray-400 outline-none border-2 border-orange-300/50 focus:border-[#FF6347] transition-colors"
        />
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number (e.g., +61412345678)"
          className="w-full bg-white rounded-full px-4 py-3 text-sm md:text-base text-gray-700 placeholder:text-gray-400 outline-none border-2 border-orange-300/50 focus:border-[#FF6347] transition-colors"
        />
        <textarea
          name="specialRequirements"
          value={form.specialRequirements}
          onChange={handleChange}
          placeholder="Special requirements (optional)"
          rows={3}
          className="w-full bg-white rounded-3xl px-4 py-3 text-sm md:text-base text-gray-700 placeholder:text-gray-400 outline-none border-2 border-orange-300/50 focus:border-[#FF6347] transition-colors resize-none"
        />
        <div className="flex gap-3 p-2 bg-gray-50/50 rounded-2xl border border-gray-100">
          <label className="flex-1 flex items-center justify-center py-2 cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="cash"
              checked={form.payment === "cash"}
              onChange={handleChange}
              className="mr-2 accent-[#FC5E39]"
            />
            <span className="text-gray-700 font-medium text-sm">Cash</span>
          </label>
          <label className="flex-1 flex items-center justify-center py-2 cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="card"
              checked={form.payment === "card"}
              onChange={handleChange}
              className="mr-2 accent-[#FC5E39]"
            />
            <span className="text-gray-700 font-medium text-sm">Card</span>
          </label>
        </div>
      </div>

      {error && (
        <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm">
          {error}
        </div>
      )}

      <div className="flex gap-2">
        <button
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-full py-3 md:py-3.5 text-sm md:text-base transition-colors shadow mb-3"
          onClick={() => {
            setStep(1)
            setError(null)
          }}
          type="button"
        >
          Back
        </button>
        <button
          className="flex-1 bg-[#FC5E39] hover:bg-[#e54d2e] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-full py-3 md:py-3.5 text-sm md:text-base transition-colors shadow mb-3 flex items-center justify-center gap-2"
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
              const selectedVehicle = fareData?.vehicles?.find(v => v.vehicleType === form.vehicle)
              const totalFare = selectedVehicle?.total_fare || 0
              return `Book Now - $${totalFare.toFixed(2)}`
            })()
          )}
        </button>
      </div>
    </>
  )

  if (isBooked) {
    return (
      <div className="w-full max-w-[435px] md:max-w-[480px] bg-white rounded-[40px] overflow-hidden shadow-2xl p-6">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
          <p className="text-gray-600 mb-6">
            Your {VehicleDisplayNames[form.vehicle] || "taxi"} is on the way.
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
              <span className="font-semibold text-gray-900">{VehicleDisplayNames[form.vehicle]}</span>
            </div>
            {fareData && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Total Fare:</span>
                <span className="font-bold text-[#FC5E39]">
                  ${(() => {
                    const selectedVehicle = fareData.vehicles?.find(v => v.vehicleType === form.vehicle)
                    return (selectedVehicle?.total_fare || 0).toFixed(2)
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
                dropoff: "",
                vehicle: "",
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
    <div id="booking-form" className="w-full max-w-[435px] md:max-w-[480px] bg-white/70 backdrop-blur-[1px] rounded-[40px] p-5 md:p-6 shadow-2xl">
      <div className="mb-4">
        <h2 className={`text-2xl md:text-3xl font-bold text-gray-900 mb-1 ${adlamDisplay.className}`}>
          Book a Taxi in Sydney
        </h2>
        <p className="text-base md:text-lg text-gray-800 mb-2">
          Fixed price rides. No surge pricing.
        </p>
      </div>

      {step === 1 && Step1}
      {step === 2 && Step2}

      <div className="flex items-center justify-center gap-6 md:gap-8 pt-2">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 mb-1">
            <Image src="/assets/images/fluent-color_people-48.png" alt="People" width={35} height={35} className="md:w-[40px] md:h-[40px]" />
          </div>
          <div className="text-lg md:text-xl font-bold text-black">50,408</div>
          <div className="text-xs text-black font-medium">Happy Rides</div>
        </div>

        <div className="w-px h-12 md:h-14 bg-gray-300"></div>

        <div className="flex flex-col items-center">
          <div className="flex items-center gap-0.5 mb-1">
            <Image src="/assets/images/Group.png" alt="Rating Stars" width={50} height={25} className="md:w-[55px] md:h-[28px]" />
          </div>
          <div className="text-lg md:text-xl font-bold text-black">4.9/5</div>
          <div className="text-xs text-black font-medium">Rating</div>
        </div>
      </div>

      <p className="text-xs text-gray-600 text-center mt-3">
        Trusted by 50,000+ riders · 4.9★ average
      </p>
    </div>
  )
}
