import React from 'react';
import { MapPin } from 'lucide-react';

export const BrandPositioning = () => {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-white to-orange-50/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Label */}
          <div className="inline-flex items-center gap-2 mb-6">
            <MapPin className="w-5 h-5 text-[#FC5E39]" />
            <span className="text-sm font-semibold text-[#FC5E39] uppercase tracking-wider">
              About Us
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            We're Australia's Taxi Company
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            Taxi2Go provides reliable taxi services across Sydney with professional local drivers, transparent 
            pricing, and no surge charges. we make taxi booking 
            simple and dependable.
          </p>
        </div>
      </div>
    </section>
  );
};
