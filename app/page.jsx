"use client";

import { useState, useEffect, useRef } from "react";
import { Hero } from "../components/Hero";
import { VehicleCards } from "../components/VehicleCards";
import { Features } from "../components/Features";
import { Testimonials } from "../components/Testimonials";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { BrandPositioning } from "../components/BrandPositioning";
import { FinalCTA } from "../components/FinalCTA";
import { MobileBottomBar } from "../components/MobileBottomBar";

export default function Home() {
  const [showBookNowButton, setShowBookNowButton] = useState(false);
  const heroRef = useRef(null);

  // Intersection Observer to detect when Hero/BookingForm is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show button when Hero is NOT visible
        setShowBookNowButton(!entry.isIntersecting);
      },
      {
        threshold: 0.1, // Trigger when 10% of Hero is visible
        rootMargin: "0px"
      }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  const scrollToBookingForm = () => {
    heroRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />

      <main>
        <div ref={heroRef}>
          <Hero />
        </div>
        <VehicleCards />
        
        {/* Services Section */}
        <section id="services" className="py-16 md:py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
                  Our <span className="text-[#FC5E39]">Services</span>
                </h2>
                <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                  Professional taxi services across Sydney, available 24/7 for all your transportation needs
                </p>
              </div>

              {/* Services Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Service 1 */}
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="w-14 h-14 bg-[#FC5E39]/10 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-7 h-7 text-[#FC5E39]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Sydney Airport Taxi</h3>
                  <p className="text-gray-600 text-sm">
                    Reliable airport transfers with on-time pickups and professional drivers
                  </p>
                </div>

                {/* Service 2 */}
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="w-14 h-14 bg-[#FC5E39]/10 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-7 h-7 text-[#FC5E39]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">24/7 Taxi Service</h3>
                  <p className="text-gray-600 text-sm">
                    Book a taxi anytime, day or night, across Sydney metropolitan area
                  </p>
                </div>

                {/* Service 3 */}
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="w-14 h-14 bg-[#FC5E39]/10 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-7 h-7 text-[#FC5E39]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Maxi Taxi Sydney</h3>
                  <p className="text-gray-600 text-sm">
                    Large group transport with 11-seater vehicles for families and groups
                  </p>
                </div>

                {/* Service 4 */}
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="w-14 h-14 bg-[#FC5E39]/10 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-7 h-7 text-[#FC5E39]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Corporate Taxi Services</h3>
                  <p className="text-gray-600 text-sm">
                    Professional business transport solutions with invoicing and account management
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <BrandPositioning />
        <Features />
        <Testimonials />
        <FinalCTA />
        {/* <PaymentMethods /> */}
      </main>

      <Footer />
      
      {/* Mobile Bottom Bar - Fixed */}
      <MobileBottomBar />

      {/* Floating Book Now Button - Shows when BookingForm is not visible */}
      {showBookNowButton && (
        <button
          onClick={scrollToBookingForm}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 bg-[#FC5E39] hover:bg-[#e54d2e] text-white font-bold px-8 py-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 animate-fade-in cursor-pointer"
          aria-label="Book Now"
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
            />
          </svg>
          Book Now
        </button>
      )}
    </div>
  );
}
