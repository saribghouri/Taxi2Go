"use client"
import { useState, useRef, useEffect } from "react"
import { MapPin, Car, ChevronDown, Users, CreditCard, Calendar, Lock, User, CheckCircle } from "lucide-react"
import Image from "next/image"
import { ADLaM_Display } from 'next/font/google'
const VEHICLES = [
  {
    id: "sedan",
    name: "Sedan Taxi",
    capacity: "1 to 4 person",
    image: "/assets/images/sedan-removebg-preview.png",
  },
  {
    id: "suv",
    name: "SUV Taxi",
    capacity: "1 to 7 person",
    image: "/assets/images/suv-removebg-preview.png",
  },
  {
    id: "maxi",
    name: "Maxi Taxi",
    capacity: "1 to 11 person",
    image: "/assets/images/11_seater-removebg-preview.png",
  },
]

const adlamDisplay = ADLaM_Display({ 
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})
const AUSTRALIA_LOCATIONS = [
  { name: "Sydney", area: "New South Wales", type: "City" },
  { name: "Melbourne", area: "Victoria", type: "City" },
  { name: "Brisbane", area: "Queensland", type: "City" },
  { name: "Perth", area: "Western Australia", type: "City" },
  { name: "Adelaide", area: "South Australia", type: "City" },
  { name: "Gold Coast", area: "Queensland", type: "City" },
  { name: "Canberra", area: "Australian Capital Territory", type: "City" },
  { name: "Hobart", area: "Tasmania", type: "City" },
  { name: "Darwin", area: "Northern Territory", type: "City" },
  { name: "Surry Hills", area: "Sydney, NSW", type: "Suburb" },
  { name: "Parramatta", area: "Sydney, NSW", type: "Suburb" },
  { name: "Bondi Beach", area: "Sydney, NSW", type: "Suburb" },
  { name: "Manly", area: "Sydney, NSW", type: "Suburb" },
  { name: "Richmond", area: "Melbourne, VIC", type: "Suburb" },
  { name: "St Kilda", area: "Melbourne, VIC", type: "Suburb" },
  { name: "Fortitude Valley", area: "Brisbane, QLD", type: "Suburb" },
]

export const BookingForm = () => {
  const [step, setStep] = useState(1)
  const [isVehicleOpen, setIsVehicleOpen] = useState(false)
  const [activeLocationField, setActiveLocationField] = useState(null)
  const [filteredLocations, setFilteredLocations] = useState(AUSTRALIA_LOCATIONS)
  const [isBooked, setIsBooked] = useState(false)

  const dropdownRef = useRef(null)
  const pickupRef = useRef(null)
  const dropoffRef = useRef(null)

  const [form, setForm] = useState({
    pickup: "",
    dropoff: "",
    vehicle: "",
    name: "",
    email: "",
    phone: "",
    payment: "cash",
    otp: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardHolder: "",
  })

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsVehicleOpen(false)
      }
      if (pickupRef.current && !pickupRef.current.contains(event.target)) {
        if (activeLocationField === "pickup") setActiveLocationField(null)
      }
      if (dropoffRef.current && !dropoffRef.current.contains(event.target)) {
        if (activeLocationField === "dropoff") setActiveLocationField(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [activeLocationField])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))

    if (name === "pickup" || name === "dropoff") {
      setActiveLocationField(name)
      const filtered = AUSTRALIA_LOCATIONS.filter(
        (loc) =>
          loc.name.toLowerCase().includes(value.toLowerCase()) || loc.area.toLowerCase().includes(value.toLowerCase()),
      )
      setFilteredLocations(filtered)
    }
  }

  const selectLocation = (field, locationName) => {
    setForm((prev) => ({ ...prev, [field]: locationName }))
    setActiveLocationField(null)
  }

  const selectVehicle = (vehicleName) => {
    setForm((prev) => ({ ...prev, vehicle: vehicleName }))
    setIsVehicleOpen(false)
  }

  const Step1 = (
    <>
      <div className="space-y-3 md:space-y-4 mb-5 md:mb-6">
        <div className="relative" ref={pickupRef}>
          <div className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 z-10">
            <MapPin className="w-5 h-5 md:w-5 md:h-5 text-gray-700" />
          </div>
          <input
            type="text"
            name="pickup"
            value={form.pickup}
            onChange={handleChange}
            onFocus={() => setActiveLocationField("pickup")}
            placeholder="Search pickup location (All Australia cities)"
            className="w-full bg-white rounded-full pl-11 md:pl-12 pr-4 py-3 md:py-3.5 text-[14px] md:text-base text-gray-700 placeholder:text-gray-400 outline-none border-2 border-orange-300/50 focus:border-[#FF6347] transition-colors"
          />
          {activeLocationField === "pickup" && filteredLocations.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-orange-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              {filteredLocations.map((loc, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => selectLocation("pickup", loc.name)}
                  className="w-full flex items-center p-3 hover:bg-orange-50 transition-colors border-b border-gray-50 last:border-0"
                >
                  <MapPin className="w-4 h-4 text-orange-400 mr-3 flex-shrink-0" />
                  <div className="text-left">
                    <div className="font-bold text-gray-900 text-sm">{loc.name}</div>
                    <div className="text-xs text-gray-500">{loc.area}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative" ref={dropoffRef}>
          <div className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 z-10">
            <MapPin className="w-5 h-5 md:w-5 md:h-5 text-gray-700" />
          </div>
          <input
            type="text"
            name="dropoff"
            value={form.dropoff}
            onChange={handleChange}
            onFocus={() => setActiveLocationField("dropoff")}
            placeholder="Search dropoff location"
            className="w-full bg-white rounded-full pl-11 md:pl-12 pr-4 py-3 md:py-3.5 text-[14px] md:text-base text-gray-700 placeholder:text-gray-400 outline-none border-2 border-orange-300/50 focus:border-[#FF6347] transition-colors"
          />
          {activeLocationField === "dropoff" && filteredLocations.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-orange-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              {filteredLocations.map((loc, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => selectLocation("dropoff", loc.name)}
                  className="w-full flex items-center p-3 hover:bg-orange-50 transition-colors border-b border-gray-50 last:border-0"
                >
                  <MapPin className="w-4 h-4 text-orange-400 mr-3 flex-shrink-0" />
                  <div className="text-left">
                    <div className="font-bold text-gray-900 text-sm">{loc.name}</div>
                    <div className="text-xs text-gray-500">{loc.area}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative" ref={dropdownRef}>
          <div className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 z-10">
            <Car className="w-5 h-5 md:w-5 md:h-5 text-gray-700" />
          </div>
          <button
            type="button"
            onClick={() => setIsVehicleOpen(!isVehicleOpen)}
            className="w-full bg-white rounded-full pl-11 md:pl-12 pr-10 py-3 md:py-3.5 text-left text-[14px] md:text-base text-gray-700 outline-none border-2 border-orange-300/50 focus:border-[#FF6347] transition-colors flex items-center justify-between"
          >
            <span>{form.vehicle || "Select vehicle type"}</span>
            <ChevronDown className={`w-5 h-5 transition-transform ${isVehicleOpen ? "rotate-180" : ""}`} />
          </button>

          {isVehicleOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-3xl shadow-2xl border border-orange-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              {VEHICLES.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => selectVehicle(v.name)}
                  className={`w-full flex items-center p-3 transition-colors border-b border-[#ece6e6] last:border-0 ${form.vehicle === v.name ? 'bg-orange-100' : 'hover:bg-orange-50'}`}
                >
                    <div className="w-20 h-12 flex-shrink-0  rounded-lg overflow-hidden mr-4">
                      <img
                        src={v.image || "/placeholder.svg"}
                        alt={v.name}
                        className="w-full h-full object-contain p-1"
                      />
                    </div>
                    <div className="flex-1 flex flex-col text-left">
                      <div className="font-bold text-gray-900 text-sm md:text-base">{v.name}</div>
                      <div className="flex items-center gap-1 text-gray-500 text-xs md:text-sm mt-1">
                        {v.capacity}
                        <Users className="w-3 h-3 ml-1" />
                      </div>
                    </div>
                    <div className="flex flex-col items-end min-w-[90px]">
                      <div className="font-bold text-[#333] text-xs md:text-sm">Fixed Price</div>
                      <div className="text-[#FC5E39] text-xs md:text-sm mt-1">$XX.XX</div>
                    </div>
                    {/* Removed orange dot indicator for selected vehicle */}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <button
        className="w-full cursor-pointer bg-[#FC5E39] hover:bg-[#e54d2e] text-white font-bold text-[17px] md:text-lg rounded-full py-3.5 md:py-4 transition-colors shadow-lg mb-4"
        onClick={() => setStep(2)}
        type="button"
      >
        Next
      </button>
    </>
  )

  const Step2 = (
    <>
      <div className="space-y-3 md:space-y-4 mb-5 md:mb-6">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full bg-white rounded-full px-4 py-3 md:py-3.5 text-[14px] md:text-base text-gray-700 placeholder:text-gray-400 outline-none border-2 border-orange-300/50 focus:border-[#FF6347] transition-colors"
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email Address"
          className="w-full bg-white rounded-full px-4 py-3 md:py-3.5 text-[14px] md:text-base text-gray-700 placeholder:text-gray-400 outline-none border-2 border-orange-300/50 focus:border-[#FF6347] transition-colors"
        />
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full bg-white rounded-full px-4 py-3 md:py-3.5 text-[14px] md:text-base text-gray-700 placeholder:text-gray-400 outline-none border-2 border-orange-300/50 focus:border-[#FF6347] transition-colors"
        />
        <div className="flex gap-4 p-2 bg-gray-50/50 rounded-2xl border border-gray-100">
          <label className="flex-1 flex items-center justify-center py-2 cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="cash"
              checked={form.payment === "cash"}
              onChange={handleChange}
              className="mr-2 accent-[#FC5E39]"
            />
            <span className="text-gray-700 font-medium">Cash</span>
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
            <span className="text-gray-700 font-medium">Card</span>
          </label>
        </div>
        {form.payment === "cash" && (
          <div className="space-y-2">
            <input
              type="text"
              name="otp"
              maxLength={4}
              value={form.otp}
              onChange={handleChange}
              placeholder="Enter 4-digit OTP"
              className="w-full bg-white rounded-full px-4 py-3 md:py-3.5 text-center tracking-[1em] font-bold text-lg text-gray-700 placeholder:tracking-normal placeholder:font-normal placeholder:text-base outline-none border-2 border-orange-300/50 focus:border-[#FF6347] transition-colors"
            />
            <p className="text-[11px] text-gray-500 text-center">OTP will confirm your booking instantly</p>
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <button
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-full py-3.5 md:py-4 transition-colors shadow mb-4"
          onClick={() => setStep(1)}
          type="button"
        >
          Back
        </button>
        <button
          className="flex-1 bg-[#FC5E39] hover:bg-[#e54d2e] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-full py-3.5 md:py-4 transition-colors shadow mb-4"
          onClick={() => {
            if (form.payment === "card") {
              setStep(3)
            } else if (form.otp.length === 4) {
              setIsBooked(true)
            }
          }}
          disabled={form.payment === "cash" && form.otp.length !== 4}
          type="button"
        >
          {form.payment === "card" ? "Next" : "Book Taxi Now"}
        </button>
      </div>
    </>
  )

  const Step3 = (
    <>
      <div className="space-y-3 mb-5 md:mb-6">
        <div className="relative">
          <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            name="cardNumber"
            value={form.cardNumber}
            onChange={handleChange}
            placeholder="Card Number"
            className="w-full bg-white rounded-full pl-12 pr-4 py-3 md:py-3.5 text-[14px] md:text-base text-gray-700 outline-none border-2 border-orange-300/50 focus:border-[#FF6347] transition-colors"
          />
        </div>
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              name="expiry"
              value={form.expiry}
              onChange={handleChange}
              placeholder="MM/YY"
              className="w-full bg-white rounded-full pl-10 pr-4 py-3 text-[14px] md:text-base text-gray-700 outline-none border-2 border-orange-300/50 focus:border-[#FF6347] transition-colors"
            />
          </div>
          <div className="relative flex-1">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              name="cvv"
              value={form.cvv}
              onChange={handleChange}
              placeholder="CVV"
              className="w-full bg-white rounded-full pl-10 pr-4 py-3 text-[14px] md:text-base text-gray-700 outline-none border-2 border-orange-300/50 focus:border-[#FF6347] transition-colors"
            />
          </div>
        </div>
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            name="cardHolder"
            value={form.cardHolder}
            onChange={handleChange}
            placeholder="Card Holder Name"
            className="w-full bg-white rounded-full pl-12 pr-4 py-3 md:py-3.5 text-[14px] md:text-base text-gray-700 outline-none border-2 border-orange-300/50 focus:border-[#FF6347] transition-colors"
          />
        </div>
      </div>
      <div className="flex gap-2">
        <button
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-full py-3.5 md:py-4 transition-colors shadow mb-4"
          onClick={() => setStep(2)}
          type="button"
        >
          Back
        </button>
        <button
          className="flex-1 bg-[#FC5E39] hover:bg-[#e54d2e] text-white font-bold rounded-full py-3.5 md:py-4 transition-colors shadow mb-4"
          onClick={() => setIsBooked(true)}
          type="button"
        >
          Pay & Book Taxi
        </button>
      </div>
    </>
  )

  if (isBooked) {
    return (
      <div className="w-full max-w-[435px] md:max-w-[480px] h-[550px] bg-white rounded-[40px] overflow-hidden shadow-2xl relative">
        <iframe
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyD...&q=${encodeURIComponent(form.pickup || "Sydney")}`}
          className="absolute inset-0 opacity-60 grayscale-[0.2]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent flex flex-col items-center justify-end p-8 text-center">
          <div className="bg-white/90 backdrop-blur-md p-8 rounded-[32px] shadow-xl border border-orange-100 w-full animate-in zoom-in-95 duration-500">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
            <p className="text-gray-600 mb-6">
              Your {form.vehicle || "taxi"} is on the way to {form.pickup}.
            </p>
            <div className="space-y-3 text-left bg-gray-50 p-4 rounded-2xl mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Pickup:</span>
                <span className="font-semibold text-gray-900">{form.pickup}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Vehicle:</span>
                <span className="font-semibold text-gray-900">{form.vehicle}</span>
              </div>
            </div>
            <button
              onClick={() => {
                setIsBooked(false)
                setStep(1)
                setForm({ ...form, otp: "", cardNumber: "", expiry: "", cvv: "", cardHolder: "" })
              }}
              className="w-full bg-[#FC5E39] text-white font-bold py-4 rounded-full shadow-lg hover:bg-[#e54d2e] transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-[435px] md:max-w-[480px] h-auto bg-white/70 backdrop-blur-[1px] rounded-[40px] p-7 md:p-8 shadow-2xl">
      <div className=" mb-6">
        <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-2  ${adlamDisplay.className}`}>
          Book a Taxi in Sydney in Seconds.
        </h2>
        <p className="text-lg md:text-lg text-gray-800">
          Fixed price rides with licensed Sydney taxis. No surge pricing. No delays.
        </p>
      </div>

      {step === 1 && Step1}
      {step === 2 && Step2}
      {step === 3 && Step3}

   <div className="flex items-center justify-center gap-6 md:gap-8">
        {/* Happy Rides */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 mb-1">
            <Image src="/assets/images/fluent-color_people-48.png" alt="People" width={40} height={50} className="md:w-[45px] md:h-[38px]" />
          </div>
          <div className="text-xl md:text-2xl font-bold text-black">50,408</div>
          <div className="text-xs md:text-sm text-black font-medium">Happy Rides</div>
        </div>

        {/* Divider */}
        <div className="w-px h-16 md:h-16 bg-gray-300"></div>

        {/* Rating */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-0.5 mb-1">
            <Image src="/assets/images/Group.png" alt="Rating Stars" width={55} height={30} className="md:w-[55px] md:h-[30px]" />
          </div>
          <div className="text-xl md:text-2xl font-bold text-black">4.9/5</div>
          <div className="text-xs md:text-sm text-black font-medium">Rating</div>
        </div>
      </div>
    </div>
  )
}
