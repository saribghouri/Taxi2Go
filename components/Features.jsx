import React from 'react';
import { Button } from './ui/Button';
import { ArrowRight, MapPin } from 'lucide-react';
import Image from 'next/image';
import { AirportSection } from './airportSection';
import { SafetySection } from './safetySection';
import { Shield, CheckCircle } from "lucide-react"
import { motion } from 'framer-motion';
export const Features = () => {
  const textVariants = {
  offscreen: { y: 100, opacity: 0 },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', bounce: 0.4, duration: 0.8 }
  }
};

const imageVariants = {
  offscreen: { y: 150, opacity: 0 },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', bounce: 0.4, duration: 1, delay: 0.2 }
  }
};

const listItemVariants = {
  offscreen: { x: -50, opacity: 0 },
  onscreen: (i) => ({
    x: 0,
    opacity: 1,
    transition: { delay: i * 0.2 + 0.3, duration: 0.6 }
  })
};
  return <>
      {/* Company Info Section */}
  

      {/* Ride Safety Section */}
   <section className=" md:py-10 bg-white overflow-hidden">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
      {/* Text Content - Left on desktop, top on mobile */}
      <motion.div
        className="flex flex-col space-y-6 lg:space-y-8 flex-1 text-center lg:text-left"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        variants={textVariants}
      >
        {/* Label */}
        <div className="inline-flex items-center gap-2 w-fit mx-auto lg:mx-0">
          <Shield className="w-5 h-5 text-[#FC5E39]" />
          <span className="text-sm font-semibold text-[#FC5E39] uppercase tracking-wider">Your Safety</span>
        </div>

        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FC5E39]">
          Ride Safely,{" "}
          <span className="text-[#000000]">
            Every <br className="hidden sm:block" />Time
          </span>
        </h2>

        {/* Description */}
        <p className="text-lg text-[#3f3f3f] max-w-xl mx-auto lg:mx-0">
          Track your ride live with GPS, travel with licensed drivers, and arrive safely with a trusted Sydney taxi
          service. Your safety is our priority.
        </p>

        {/* Features List */}
        <div className="space-y-4 pt-4">
          {[
            "Live GPS tracking",
            "Licensed professional drivers",
            "24/7 customer support"
          ].map((text, i) => (
            <motion.div
              key={i}
              className="flex items-start gap-3"
              custom={i}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true }}
              variants={listItemVariants}
            >
              <CheckCircle className="w-6 h-6 text-[#FC5E39] flex-shrink-0 mt-1" />
              <span className="text-[#3f3f3f]">{text}</span>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          className="pt-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <button className="px-8 py-4 bg-[#FC5E39] hover:bg-[#e05535] text-white font-bold rounded-lg transition-colors text-lg shadow-lg hover:shadow-xl">
            Book Now
          </button>
        </motion.div>
      </motion.div>

      {/* Image - Right on desktop, bottom on mobile */}
<motion.div
  className="w-full max-w-md lg:max-w-none lg:w-1/2 flex justify-center lg:justify-end"
  initial="offscreen"
  whileInView="onscreen"
  viewport={{ once: true, amount: 0.3 }}
  variants={imageVariants}
>
  <Image
    src="/assets/images/half-phone2-removebg-preview (1).png"
    alt="App preview"
    width={660}
    height={660}
    priority
    className="object-contain w-full h-auto max-w-[460px] sm:max-w-[520px] lg:max-w-none mb-[-40px] sm:mb-[-80px] lg:mb-[-175px]"
  />
</motion.div>
    </div>
  </div>
</section>
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#ffffff] to-[#ffffff]">
      {/* Call Button */}
      <div className="flex items-center justify-center py-12">
       
      </div>

      {/* Airport & Safety Sections */}
      <main >
    
            <AirportSection />
            {/* <SafetySection /> */}
        
      
      </main>
    </div>
    </>;
};