import React from 'react';
import Image from 'next/image';
import { BookingForm } from './BookingForm';
export const Hero = () => {
  return <section className="relative w-full pt-24 pb-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/Rectangle%202.png"
          alt="Hero Background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          quality={100}
        />
        {/* Dark Overlay to make text readable and match the moody vibe */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 flex justify-center">
        <BookingForm />
      </div>
    </section>;
};