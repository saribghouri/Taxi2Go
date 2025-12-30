import Image from "next/image"
import { Shield, CheckCircle } from "lucide-react"

export function SafetySection() {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
      {/* Content Section */}
      <div className="flex flex-col justify-center space-y-6 lg:space-y-8 flex-1">
        {/* Label */}
        <div className="inline-flex items-center gap-2 w-fit">
          <Shield className="w-5 h-5 text-[#FC5E39]" />
          <span className="text-sm font-semibold text-[#FC5E39] uppercase tracking-wider">Your Safety</span>
        </div>

        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FC5E39] leading-tight">
          Ride Safely,{" "}
          <span className="text-[#000000]">
            Every <br></br>Time
          </span>
        </h2>

        {/* Description */}
        <p className="text-lg text-[#3f3f3f] leading-relaxed max-w-xl">
          Track your ride live with GPS, travel with licensed drivers, and arrive safely with a trusted Sydney taxi
          service. Your safety is our priority.
        </p>

        {/* Features List */}
        <div className="space-y-4 pt-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-[#FC5E39] flex-shrink-0 mt-1" />
            <span className="text-[#3f3f3f]">Live GPS tracking</span>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-[#FC5E39] flex-shrink-0 mt-1" />
            <span className="text-[#3f3f3f]">Licensed professional drivers</span>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-[#FC5E39] flex-shrink-0 mt-1" />
            <span className="text-[#3f3f3f]">24/7 customer support</span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="pt-4">
          <button className="px-8 py-4 bg-[#FC5E39] hover:[#FC5E39] text-white font-bold rounded-lg transition-colors text-lg">
            Book Now
          </button>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-end justify-center lg:justify-end flex-1">
        <Image
          src="/assets/images/half-phone2.png"
          alt="App preview"
          width={360}
          height={360}
          priority
          className="object-contain mb-[-65px]"
        />
      </div>
    </div>
  )
}
