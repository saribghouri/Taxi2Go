import React from 'react';
import { User, Briefcase } from 'lucide-react';
const vehicles = [{
  name: 'Sedan',
  passengers: '1-4 Passengers',
  image: "/sedan.png",
    fallbackImage: 'assets/images/sedan.png',

  capacity: 4,
  luggage: 2,
  bags: 2
}, {
  name: 'SUV',
  passengers: '1-4 Passengers',
  image: "/suv.png",
  fallbackImage: 'assets/images/suv.png',
  capacity: 4,
  luggage: 5,
  bags: 3
}, {
  name: '11 Seater',
  passengers: '1-11 Passengers',
  image: "/van.png",
  fallbackImage: 'assets/images/11 seater.png',
  capacity: 11,
  luggage: 10,
  bags: 6
}];
export const VehicleCards = () => {
  return <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Choose A Vehicle That Fit
        </h2>

        <div className="grid grid-cols-3 gap-3 md:gap-6">
          {vehicles.map((vehicle, index) => <div key={index} className="bg-gray-50 rounded-xl md:rounded-2xl p-3 md:p-6 flex flex-col items-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-full flex justify-between items-start mb-2 md:mb-4">
                <div>
                  <h3 className="text-sm md:text-xl font-bold text-gray-900">
                    {vehicle.name}
                  </h3>
                  <p className="text-[10px] md:text-xs text-gray-500">{vehicle.passengers}</p>
                </div>
                <button className="text-gray-300 hover:text-brand-orange transition-colors hidden md:block">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>
              </div>

              <div className="h-20 md:h-32 w-full mb-3 md:mb-6 flex items-center justify-center">
                <img src={vehicle.fallbackImage} alt={vehicle.name} className="max-h-full max-w-full object-contain mix-blend-multiply" />
              </div>

              <div className="flex items-center justify-center gap-2 md:gap-6 text-gray-500 text-[10px] md:text-sm w-full border-t border-gray-200 pt-2 md:pt-4">
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3 md:w-4 md:h-4" />
                  <span>{vehicle.capacity}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Briefcase className="w-3 h-3 md:w-4 md:h-4" />
                  <span>{vehicle.luggage}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Briefcase className="w-3 h-3 md:w-4 md:h-4" />
                  <span>{vehicle.bags}</span>
                </div>
              </div>
            </div>)}
        </div>
      </div>
    </section>;
};