import React, { useState, useEffect } from 'react';

export const MobileBottomBar = () => {
  const [showBar, setShowBar] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      // Get the booking form element
      const bookingForm = document.getElementById('booking-form');
      if (bookingForm) {
        const rect = bookingForm.getBoundingClientRect();
        const formBottom = rect.bottom + window.scrollY;
        // Show bar when scrolled past booking form bottom
        if (window.scrollY + window.innerHeight >= formBottom) {
          setShowBar(true);
        } else {
          setShowBar(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMounted]);

  if (!isMounted || !showBar) return null;

  return (
    <div className="fixed bottom-4  left-4 right-4 z-50 md:hidden bg-[#FF6347] shadow-2xl border border-orange-600 rounded-2xl">
      <div className="px-4 py-3 flex items-center justify-between">
        {/* Left side - Text */}
        <div className="flex-1">
          <h3 className="text-white font-bold text-[15px] leading-tight mb-0.5">
            Book a Taxi in Sydney
          </h3>
          <p className="text-white/90 text-[11px]">
            Fixed price. No surge. 24/7
          </p>
        </div>

        {/* Right side - Button */}
        <button
          onClick={() => {
            if (typeof window !== 'undefined') {
              document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="bg-white hover:bg-gray-100 text-[#FF6347] font-bold px-6 py-2.5 rounded-full transition-colors shadow-lg text-sm whitespace-nowrap"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

