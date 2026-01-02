import React from 'react';
import { Car } from 'lucide-react';

export const FinalCTA = () => {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-orange-50/30 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Need a Taxi Right Now?
          </h2>

          {/* Text */}
          <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
            Book a taxi near you in Sydney — fast, simple, and reliable.
          </p>

          {/* CTA Button */}
          <button className="inline-flex items-center gap-3 px-10 py-5 bg-[#FC5E39] hover:bg-[#e54d2e] text-white font-bold rounded-full transition-colors text-lg shadow-lg hover:shadow-xl">
            <Car className="w-6 h-6" />
            Book Taxi Now
          </button>
        </div>
      </div>
    </section>
  );
};
