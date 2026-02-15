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
import { ServicesCarousel } from "../components/ServicesCarousel";

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
        rootMargin: "0px",
      },
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
        <ServicesCarousel />

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
