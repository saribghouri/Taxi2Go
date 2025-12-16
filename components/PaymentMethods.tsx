import React from 'react';
import Image from 'next/image';

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
        <h2 className="text-3xl font-bold text-black mb-10">We Accept</h2>

        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10   transition-all duration-300">
          {logos.map((logo, idx) => (
            <div key={idx} className="h-10 md:h-12 w-auto flex items-center">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={180}
                height={80}
                className="object-contain max-h-full"
                priority
              />
            </div>
          ))}
        </div>
      </div>
    </section>;
};