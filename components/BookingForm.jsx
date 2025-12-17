"use client"
import { MapPin, Navigation, Car } from "lucide-react"
import Image from "next/image"

export const BookingForm = () => {
  return (
    <div className="w-full max-w-[540px] bg-white/70 backdrop-blur-[1px] rounded-[40px] p-10 shadow-2xl">
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-black mb-3 leading-tight">BOOK A TAXI IN SECONDS</h1>
        <p className="text-black text-[20px] leading-relaxed">
          FIXED PRICE, ON-TIME PICKED, LOCAL SYDNEY DRIVERS. NO SURGE. NO DRAMA.
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-4 mb-6">
        {/* Pickup Location */}
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
            <MapPin className="w-5 h-5 text-gray-700" />
          </div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
            <Navigation className="w-5 h-5 text-gray-700" />
          </div>
          <input
            type="text"
            placeholder="Your Picked Location"
            className="w-full bg-white rounded-full pl-12 pr-12 py-4 text-gray-400 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#FF6347]/50 transition-shadow"
          />
        </div>

        {/* Drop-off Location */}
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
            <MapPin className="w-5 h-5 text-gray-700" />
          </div>
          <input
            type="text"
            placeholder="Drop off Location"
            className="w-full bg-white rounded-full pl-12 pr-4 py-4 text-gray-400 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#FF6347]/50 transition-shadow"
          />
        </div>

        {/* Vehicle Type Dropdown */}
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
            <Car className="w-5 h-5 text-gray-700" />
          </div>
          <select className="w-full bg-white rounded-full pl-12 pr-4 py-4 text-gray-400 outline-none focus:ring-2 focus:ring-[#FF6347]/50 transition-shadow appearance-none cursor-pointer">
            <option>Drop off Location</option>
            <option>Sedan</option>
            <option>SUV</option>
            <option>Van</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Booking Button */}
      <button className="w-full cursor-pointer bg-[#FC5E39] hover:bg-[#FC5E39] text-white font-bold text-lg rounded-full py-5 mb-8 transition-colors shadow-lg">
        BOOKING
      </button>

      {/* Stats */}
      <div className="flex items-center justify-center gap-8">
        {/* Happy Rides */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 mb-2">
            <Image src="/assets/images/fluent-color_people-48.png" alt="People" width={52} height={32} />
          </div>
          <div className="text-3xl font-bold text-black">50,408</div>
          <div className="text-sm text-black font-medium">Happy Rides</div>
        </div>

        {/* Divider */}
        <div className="w-px h-20 bg-gray-300"></div>

        {/* Rating */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-0.5 mb-2">
            <Image src="/assets/images/Group.png" alt="Rating Stars" width={60} height={24} />
          </div>
          <div className="text-3xl font-bold text-black">4.9/5</div>
          <div className="text-sm text-black font-medium">Rating</div>
        </div>
      </div>
    </div>
  )
}
