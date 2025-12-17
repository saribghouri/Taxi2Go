import React from 'react';
import Image from 'next/image';
import { ADLaM_Display } from 'next/font/google'

const adlamDisplay = ADLaM_Display({ 
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

const logos = [
  {
    src: '/assets/images/images 1.png',
    alt: 'Payment logo 1',
  },
  {
    src: '/assets/images/d826de_05867e1e965e4438a9f74dd7cc81df4e~mv2 1.png',
    alt: 'Payment logo 2',
  },
  {
    src: '/assets/images/Group 62.png',
    alt: 'Payment logo 3',
  },
  {
    src: '/assets/images/images 3.png',
    alt: 'Payment logo 4',
  },
  {
    src: '/assets/images/Group 60.png',
    alt: 'Payment logo 5',
  },
];

export const PaymentMethods = () => {
  return <section className="py-16 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className={`text-3xl md:text-[48px] font-bold text-black mb-10 ${adlamDisplay.className}`}>We Accept</h2>

        {/* Mobile: 2 rows layout */}
        <div className="md:hidden flex flex-col items-center gap-4 max-w-md mx-auto">
          {/* First row - 2 items */}
          <div className="flex justify-center items-center gap-4">
            {logos.slice(0, 2).map((logo, idx) => (
              <div key={idx} className="flex items-center justify-center">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={idx === 1 ? 110 : 80}
                  height={idx === 1 ? 60 : 50}
                  className={`object-contain ${idx === 1 ? 'w-[110px] h-[60px]' : 'w-[80px] h-[50px]'}`}
                  priority
                />
              </div>
            ))}
          </div>
          
          {/* Second row - 3 items */}
          <div className="flex justify-center items-center gap-4">
            {logos.slice(2, 5).map((logo, idx) => (
              <div key={idx + 2} className="flex items-center justify-center">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={idx === 0 || idx === 1 ? 110 : 80}
                  height={idx === 0 || idx === 1 ? 60 : 50}
                  className={`object-contain ${idx === 0 || idx === 1 ? 'w-[110px] h-[60px]' : 'w-[80px] h-[50px]'}`}
                  priority
                />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Single row layout */}
        <div className="hidden md:flex justify-center items-center gap-10">
          {logos.map((logo, idx) => (
            <div key={idx} className="flex items-center justify-center">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={idx === 1 ? 160 : 120}
                height={idx === 1 ? 80 : 60}
                className={`object-contain ${idx === 1 ? 'w-[160px] h-[80px]' : 'w-[120px] h-[60px]'}`}
                priority
              />
            </div>
          ))}
        </div>
      </div>
    </section>;
};