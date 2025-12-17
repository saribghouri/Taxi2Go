"use client"
import { MapPin, Navigation, Car } from "lucide-react"
import Image from "next/image"

export const BookingForm = () => {
  return (
    <div className="w-full max-w-[435px] md:max-w-[480px] h-[526px] md:h-auto md:max-h-[570px] bg-white/70 backdrop-blur-[1px] rounded-[40px] p-7 md:p-8 shadow-2xl">
      {/* Heading */}
      <div className="mb-4 md:mb-5">
        <h1 className="text-[26px] md:text-3xl font-bold text-black mb-1.5 md:mb-2 leading-tight">BOOK A TAXI IN SECONDS</h1>
        <p className="text-black text-[13px] md:text-base leading-tight">
          FIXED PRICE, ON-TIME PICKED, LOCAL SYDNEY DRIVERS. NO SURGE. NO DRAMA.
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-2.5 md:space-y-3 mb-4 md:mb-5">
        {/* Pickup Location */}
        <div className="relative">
          <div className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 z-10">
            <MapPin className="w-5 h-5 md:w-5 md:h-5 text-gray-700" />
          </div>
          <div className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 z-10">
            <Navigation className="w-5 h-5 md:w-5 md:h-5 text-gray-700" />
          </div>
          <input
            type="text"
            placeholder="Your Picked Location"
            className="w-full bg-white rounded-full pl-11 md:pl-12 pr-11 md:pr-12 py-3 md:py-3 text-[14px] md:text-base text-gray-400 placeholder:text-gray-400 outline-none border-2 border-orange-300/50 focus:border-[#FF6347] transition-colors"
          />
        </div>

        {/* Drop-off Location */}
        <div className="relative">
          <div className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 z-10">
            <MapPin className="w-5 h-5 md:w-5 md:h-5 text-gray-700" />
          </div>
          <input
            type="text"
            placeholder="Drop off Location"
            className="w-full bg-white rounded-full pl-11 md:pl-12 pr-4 py-3 md:py-3 text-[14px] md:text-base text-gray-400 placeholder:text-gray-400 outline-none border-2 border-orange-300/50 focus:border-[#FF6347] transition-colors"
          />
        </div>

        {/* Vehicle Type Dropdown */}
        <div className="relative">
          <div className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 z-10">
            <Car className="w-5 h-5 md:w-5 md:h-5 text-gray-700" />
          </div>
          <select className="w-full bg-white rounded-full pl-11 md:pl-12 pr-10 md:pr-10 py-3 md:py-3 text-[14px] md:text-base text-gray-400 outline-none border-2 border-orange-300/50 focus:border-[#FF6347] transition-colors appearance-none cursor-pointer">
            <option>Vehicle Type</option>
            <option>Sedan</option>
            <option>SUV</option>
            <option>Van</option>
          </select>
          <div className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-5 h-5 md:w-5 md:h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Booking Button */}
      <button className="w-full cursor-pointer bg-[#FC5E39] hover:bg-[#FC5E39] text-white font-bold text-[17px] md:text-lg rounded-full py-3.5 md:py-4 mb-4 md:mb-5 transition-colors shadow-lg">
        BOOKING
      </button>

      {/* Stats */}
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
