import Image from 'next/image';
import { Plane, CheckCircle } from "lucide-react"

export function AirportSection() {
  return (
    <section className="py-12 lg:py-14 bg-[#ffffff]">
      <div className="container mx-auto gap-4">
        <div className="flex flex-col lg:flex-row-reverse items-center justify-center gap-12 lg:gap-24 xl:gap-32">
          {/* Content - Right Side */}
          <div className="flex flex-col justify-center space-y-6 lg:space-y-8 w-full lg:w-1/2 text-center lg:text-left">
            {/* Label */}
            <div className="inline-flex items-center gap-2 w-fit mx-auto lg:mx-0">
              <Plane className="w-5 h-5 text-[#FC5E39]" />
              <span className="text-sm font-semibold text-[#FC5E39] uppercase tracking-wider">Airport Transfers</span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#000000] leading-tight">
              Sydney Airport Taxi <span className="text-[#FC5E39]">Made Easy</span>
            </h2>

            {/* Description */}
            <p className="text-lg text-[#3f3f3f] leading-relaxed max-w-xl mx-auto lg:mx-0">
              Book a Sydney Airport taxi online and travel stress-free. Taxi2Go offers on-time pickups, luggage-friendly
              vehicles, and fixed pricing for airport transfers — day or night.
            </p>

            {/* Features List */}
            <div className="space-y-4 pt-4 mx-auto lg:mx-0">
              <div className="flex items-start gap-3 justify-start">
                <CheckCircle className="w-6 h-6 text-[#FC5E39] flex-shrink-0 mt-1" />
                <span className="text-[#3f3f3f]">On-time pickups guaranteed</span>
              </div>
              <div className="flex items-start gap-3 justify-start">
                <CheckCircle className="w-6 h-6 text-[#FC5E39] flex-shrink-0 mt-1" />
                <span className="text-[#3f3f3f]">Luggage-friendly vehicles</span>
              </div>
              <div className="flex items-start gap-3 justify-start">
                <CheckCircle className="w-6 h-6 text-[#FC5E39] flex-shrink-0 mt-1" />
                <span className="text-[#3f3f3f]">Fixed transparent pricing</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-6">
              <button className="px-8 py-4 bg-[#FC5E39] hover:bg-[#e04e2b] text-white font-bold rounded-lg transition-colors text-lg shadow-md">
                Book Airport Taxi
              </button>
            </div>
          </div>

          {/* Image - Left Side with 3D Effect */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative perspective-1000">
              <Image
                src="/assets/images/istockphoto-1554996073-612x612.jpg"
                alt="Sydney Airport Taxi"
                width={1060}
                height={1060}
                priority
                className="object-contain rounded-3xl transform rotate-y-[-15deg] rotate-x-[5deg] shadow-2xl transition-transform duration-500 hover:rotate-y-[-10deg] hover:rotate-x-[3deg] hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}