"use client"
import { User, Briefcase } from "lucide-react"
import { ADLaM_Display } from 'next/font/google'
import { useState } from 'react'

const adlamDisplay = ADLaM_Display({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

const vehicles = [
  {
    name: "Sedan",
    passengers: "1-4 Passengers",
    image: "/assets/images/sedan.png",
    capacity: 4,
    luggage: 2,
    bags: 2,
  },
  {
    name: "SUV",
    passengers: "1-4 Passengers",
    image: "/assets/images/suv.png",
    capacity: 4,
    luggage: 5,
    bags: 3,
  },
  {
    name: "11 Seater",
    passengers: "1-11 Passengers",
    image: "/assets/images/11 seater.png",
    capacity: 11,
    luggage: 10,
    bags: 6,
  },
]

export const VehicleCards = () => {
  const [selectedCard, setSelectedCard] = useState(null)

  return (
    <section id="vehicle-cards" className="py-8 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <section className="py-4 bg-white text-center mt-[40px]">
          <div className="container mx-auto  max-w-4xl">
            <h2 className={`text-[32px] md:text-[48px] font-bold text-center text-gray-900 mb-2 ${adlamDisplay.className}`}>
              Choose the Right Taxi for Your Trip
            </h2>
            <p className="text-center text-gray-600 text-base md:text-lg mb-8 md:mb-12 max-w-3xl mx-auto">
              From solo rides to group travel — clean, comfortable vehicles for every journey.
            </p>
          </div>
        </section>
        {/* Mobile: Grid layout - no scroll */}
        <div className="grid grid-cols-3 md:hidden gap-3">
          {vehicles.map((vehicle, index) => (
            <div
              key={index}
              onClick={() => setSelectedCard(index)}
              className={`rounded-lg p-2 flex flex-col items-center hover:shadow-lg transition-shadow duration-300 cursor-pointer ${selectedCard === index ? 'bg-orange-400' : 'bg-gray-50'}`}
            >
              <div className="w-full mb-2 flex justify-between items-start">
                <div className="flex-1">
                  <h3 className={`text-[14px] font-bold text-center ${selectedCard === index ? 'text-white' : 'text-gray-900'}`}>{vehicle.name}</h3>
                  <p className={`text-[11px] text-center whitespace-nowrap ${selectedCard === index ? 'text-white' : 'text-gray-500'}`}>{vehicle.passengers}</p>
                </div>
                <button className="transition-colors flex-shrink-0 ml-1">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill={selectedCard === index ? "red" : "none"}
                    stroke={selectedCard === index ? "red" : "currentColor"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={selectedCard === index ? 'text-red-500' : 'text-gray-300'}
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>
              </div>

              <div className="h-16 w-full mb-2 flex items-center justify-center">
                <img
                  src={vehicle.image || "/placeholder.svg"}
                  alt={vehicle.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <div className={`flex items-center justify-center gap-3.5 text-[9px] w-full border-t pt-2 ${selectedCard === index ? 'text-white border-white/30' : 'text-gray-600 border-gray-200'
                }`}>
                <div className="flex items-center gap-0.5">
                  <User className="w-3 h-3" />
                  <span>{vehicle.capacity}</span>
                </div>
                <div className="flex items-center gap-0.5">
                  <Briefcase className="w-3 h-3" />
                  <span>{vehicle.luggage}</span>
                </div>
                <div className="flex items-center gap-0.5">
                  <Briefcase className="w-3 h-3" />
                  <span>{vehicle.bags}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: Grid layout */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {vehicles.map((vehicle, index) => (
            <div
              key={index}
              onClick={() => setSelectedCard(index)}
              className={`rounded-xl md:rounded-2xl p-4 md:p-6 flex flex-col items-center hover:shadow-lg transition-shadow duration-300 cursor-pointer ${selectedCard === index ? 'bg-[#fc6e1c]' : 'bg-gray-50'}`}>
              <div className="w-full flex justify-between items-start mb-3 md:mb-4">
                <div>
                  <h3 className={`text-base md:text-xl font-bold ${selectedCard === index ? 'text-white' : 'text-gray-900'}`}>{vehicle.name}</h3>
                  <p className={`text-xs md:text-sm ${selectedCard === index ? 'text-white' : 'text-gray-500'}`}>{vehicle.passengers}</p>
                </div>
                <button className="transition-colors">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill={selectedCard === index ? "red" : "none"}
                    stroke={selectedCard === index ? "red" : "currentColor"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={selectedCard === index ? 'text-red-500 md:w-6 md:h-6' : 'text-gray-300 md:w-6 md:h-6'}
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>
              </div>

              <div className="h-40 w-full mb-6 flex items-center justify-center">
                <img
                  src={vehicle.image || "/placeholder.svg"}
                  alt={vehicle.name}
                  className="w-[70%] h-full object-contain"
                />
              </div>

              <div className="flex items-center justify-center gap-4 md:gap-8 text-gray-600 text-xs md:text-sm w-full border-t border-gray-200 pt-3 md:pt-4">
                <div className={`flex items-center gap-1 ${selectedCard === index ? 'text-white' : 'text-gray-600'}`}>
                  <User className="w-5 h-5" />
                  <span>{vehicle.capacity}</span>
                </div>
                <div className={`flex items-center gap-1 ${selectedCard === index ? 'text-white' : 'text-gray-600'}`}>
                  <Briefcase className="w-5 h-5" />
                  <span>{vehicle.luggage}</span>
                </div>
                <div className={`flex items-center gap-1 ${selectedCard === index ? 'text-white' : 'text-gray-600'}`}>
                  <Briefcase className="w-5 h-5" />
                  <span>{vehicle.bags}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <section className="py-4 bg-white text-center mt-[60px]">
        <div className="container mx-auto  max-w-4xl">
          <h2 className={`text-[32px] md:text-[48px] font-bold text-center text-gray-900 mb-2 ${adlamDisplay.className}`}>
            We’re Australia’s Taxi Company
          </h2>
          <p className="text-center px-[15px] text-gray-600 text-base md:text-lg mb-8 md:mb-12 max-w-3xl mx-auto">
            Taxi2Go provides reliable taxi services across Sydney with professional local drivers, transparent pricing, and no surge charges.         </p>
        </div>
      </section> */}
    </section>
  )
}
