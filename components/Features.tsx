import React from 'react';
import { Button } from './ui/Button';
import { ArrowRight, MapPin } from 'lucide-react';
import Image from 'next/image';
export const Features = () => {
  return <>
      {/* Company Info Section */}
      <section className="py-4 bg-white text-center">
        <div className="container mx-auto  max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 uppercase leading-tight">
            We're Australia's Cab <br /> Company
          </h2>
          <p className="text-black text-lg leading-relaxed mx-2">
            With Australia's largest team of Professional Drivers, we're ready
            whenever you are with a Fixed Price and no surge pricing, ever.
          </p>
        </div>
      </section>

      {/* Ride Safety Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-12">
            <div className="w-full md:w-1/2 safty-section">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Ride Safely
              </h2>
              <h3 className="text-xl text-gray-600 mb-6 font-medium">
                Live GPS Tracking
              </h3>
              <p className="text-gray-500 mb-8 leading-relaxed max-w-md">
                Serving multiple locations across Australia. Fast, affordable,
                and dependable cab rides.
              </p>
              <Button className="rounded-full px-8 py-3 text-lg font-bold flex items-center gap-2" style={{
              backgroundColor: '#FC5E39'
            }}>
                Book Now <ArrowRight size={20} />
              </Button>
            </div>

            <div className="w-full md:w-1/2 flex items-end justify-center md:justify-end">
              <Image
                src="/assets/images/half-phone.png"
                alt="App preview"
                width={360}
                height={360}
                priority
                className="object-contain mb-[-65px]"
              />
            </div>
          </div>
        </div>
      </section>
    </>;
};