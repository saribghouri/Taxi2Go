"use client";

import { useState, useEffect, useRef } from "react";
import { Hero } from "../components/Hero";
import { VehicleCards } from "../components/VehicleCards";
import { Features } from "../components/Features";
import { Testimonials } from "../components/Testimonials";
import { PaymentMethods } from "../components/PaymentMethods";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { BrandPositioning } from "../components/BrandPositioning";
import { FinalCTA } from "../components/FinalCTA";
import { MobileBottomBar } from "../components/MobileBottomBar";
import { Menu, Search, X, Facebook, Instagram, Youtube, Linkedin } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
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
      {/* Desktop Header - hidden on mobile */}
      <div className="hidden lg:block">
        <Header />
      </div>

      {/* Mobile Header */}
      <nav className="block lg:hidden fixed top-0 left-0 w-full z-50 bg-white shadow-sm px-4 py-4 flex justify-between items-center gap-4">
        <button
          type="button"
          className="text-gray-900 cursor-pointer"
          aria-label="Open menu"
          onClick={() => setIsDrawerOpen(true)}
        >
          <Menu size={28} strokeWidth={2.5} />
        </button>

        <div className="flex items-center">
          <Image
            src="/assets/images/LOGO 1.png"
            alt="Taxi2Go logo"
            width={140}
            height={36}
            priority
          />
        </div>

        {/* Right: Search - icon and bar */}
        <div className="flex items-center gap-3">
          {/* Search bar on md screens */}
          {/* <div className="hidden md:block">
            <div className="relative w-48 lg:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B4A]/30 focus:border-[#FF6B4A]"
              />
            </div>
          </div> */}
          {/* Search icon on all screens */}
          {/* <button type="button" className="text-gray-900" aria-label="Search">
            <Search size={24} />
          </button> */}
        </div>
      </nav>

      {/* Drawer + Overlay */}
      {/* Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-50"
          onClick={() => setIsDrawerOpen(false)}
          aria-hidden="true"
        />
      )}
      {/* Drawer Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-72 max-w-[80vw] bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        <div className="relative h-full p-6 flex flex-col">
          {/* Close */}
          <button
            type="button"
            className="absolute top-4 right-4 text-gray-900"
            aria-label="Close menu"
            onClick={() => setIsDrawerOpen(false)}
          >
            <X size={24} />
          </button>

          {/* Logo (optional small) */}
          <div className="mb-8">
            <Image src="/assets/images/LOGO 1.png" alt="Taxi2Go logo" width={120} height={30} />
          </div>

          {/* Menu Items */}
          <nav className="mt-2">
            <ul className="space-y-4">
              <li>
                <a
                  href="#home"
                  className="block text-gray-900 font-semibold hover:text-[#FF6B4A]"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="block text-gray-900 font-semibold hover:text-[#FF6B4A]"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="block text-gray-900 font-semibold hover:text-[#FF6B4A]"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="/lost-item"
                  className="block text-gray-900 font-semibold hover:text-[#FF6B4A]"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  Lost Item
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="block text-gray-900 font-semibold hover:text-[#FF6B4A]"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </nav>

          {/* Phone Number */}
          <div className="mt-auto pt-8 border-t border-gray-200">
            <a
              href="tel:0424106797"
              className="flex items-center justify-center gap-2 px-4 py-3 bg-[#FF6347] hover:bg-[#e54d2e] text-white font-bold rounded-full transition-colors shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-base">0424106797</span>
            </a>
          </div>

          {/* Social Icons */}
          <div className="pt-6">
            <div className="flex items-center justify-center gap-6 text-[#FF6B4A]">
              <a href="#" aria-label="Facebook" className="hover:opacity-80">
                <Facebook size={22} />
              </a>
              <a href="#" aria-label="Instagram" className="hover:opacity-80">
                <Instagram size={22} />
              </a>
              <a href="#" aria-label="YouTube" className="hover:opacity-80">
                <Youtube size={22} />
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:opacity-80">
                <Linkedin size={22} />
              </a>
            </div>
          </div>
        </div>
      </div>

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
