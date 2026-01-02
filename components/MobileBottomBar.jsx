import React from 'react';

export const MobileBottomBar = () => {
  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden bg-gradient-to-r from-gray-900 to-black shadow-2xl border border-gray-800 rounded-2xl">
      <div className="px-4 py-3 flex items-center justify-between">
        {/* Left side - Text */}
        <div className="flex-1">
          <h3 className="text-white font-bold text-[15px] leading-tight mb-0.5">
            Book a Taxi in Sydney
          </h3>
          <p className="text-gray-400 text-[11px]">
            Fixed price. No surge. 24/7
          </p>
        </div>

        {/* Right side - Button */}
        <a
          href="#book"
          className="bg-[#FF6347] hover:bg-[#e54d2e] text-white font-bold px-6 py-2.5 rounded-full transition-colors shadow-lg text-sm whitespace-nowrap"
        >
          Book Now
        </a>
      </div>
    </div>
  );
};
