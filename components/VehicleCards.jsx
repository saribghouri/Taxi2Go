import { User, Briefcase } from "lucide-react"
import { ADLaM_Display } from 'next/font/google'

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
  return (
    <section className="py-8 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className={`text-3xl md:text-[48px] font-bold text-center text-gray-900 mb-8 md:mb-12 ${adlamDisplay.className}`}>
          Choose A Vehicle That Fit
        </h2>

        {/* Mobile: Grid layout - no scroll */}
        <div className="grid grid-cols-3 md:hidden gap-2">
          {vehicles.map((vehicle, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-2 flex flex-col items-center hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-full mb-1">
                <h3 className="text-xs font-bold text-gray-900 text-center">{vehicle.name}</h3>
                <p className="text-[8px] text-gray-500 text-center">{vehicle.passengers}</p>
              </div>

              <div className="h-12 w-full mb-2 flex items-center justify-center">
                <img
                  src={vehicle.image || "/placeholder.svg"}
                  alt={vehicle.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <div className="flex items-center justify-center gap-1 text-gray-600 text-[7px] w-full border-t border-gray-200 pt-1">
                <div className="flex items-center gap-0.5">
                  <User className="w-2.5 h-2.5" />
                  <span>{vehicle.capacity}</span>
                </div>
                <div className="flex items-center gap-0.5">
                  <Briefcase className="w-2.5 h-2.5" />
                  <span>{vehicle.luggage}</span>
                </div>
                <div className="flex items-center gap-0.5">
                  <Briefcase className="w-2.5 h-2.5" />
                  <span>{vehicle.bags}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: Grid layout */}
        <div className="hidden md:grid grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
          {vehicles.map((vehicle, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl md:rounded-2xl p-4 md:p-6 flex flex-col items-center hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-full flex justify-between items-start mb-3 md:mb-4">
                <div>
                  <h3 className="text-base md:text-xl font-bold text-gray-900">{vehicle.name}</h3>
                  <p className="text-xs md:text-sm text-gray-500">{vehicle.passengers}</p>
                </div>
                <button className="text-gray-300 hover:text-orange-500 transition-colors">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="md:w-6 md:h-6"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>
              </div>

              <div className="h-22 md:h-28 lg:h-46 w-full mb-4 md:mb-6 flex items-center justify-center">
                <img
                  src={vehicle.image || "/placeholder.svg"}
                  alt={vehicle.name}
                  className="w-[60%] h-full object-contain"
                />
              </div>

              <div className="flex items-center justify-center gap-4 md:gap-8 text-gray-600 text-xs md:text-sm w-full border-t border-gray-200 pt-3 md:pt-4">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4 md:w-5 md:h-5" />
                  <span>{vehicle.capacity}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Briefcase className="w-4 h-4 md:w-5 md:h-5" />
                  <span>{vehicle.luggage}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Briefcase className="w-4 h-4 md:w-5 md:h-5" />
                  <span>{vehicle.bags}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
           <section className="py-4 bg-white text-center mt-[40px]">
        <div className="container mx-auto  max-w-4xl">
          <h2 className={`text-3xl md:text-[48px] font-bold text-gray-900 mb-6 uppercase leading-tight ${adlamDisplay.className}`}>
            We're Australia's Cab  Company
          </h2>
          <p className="text-black text-lg leading-relaxed mx-2">
            With Australia's largest team of Professional Drivers, we're ready
            whenever you are with a Fixed Price and no surge pricing, ever.
          </p>
        </div>
      </section>
    </section>
  )
}
