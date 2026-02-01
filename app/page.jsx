"use client";

import { useState } from "react";
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
          className="text-gray-900"
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
          <div className="hidden md:block">
            <div className="relative w-48 lg:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B4A]/30 focus:border-[#FF6B4A]"
              />
            </div>
          </div>
          {/* Search icon on all screens */}
          <button type="button" className="text-gray-900" aria-label="Search">
            <Search size={24} />
          </button>
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
                  href="#book"
                  className="block text-gray-900 font-semibold hover:text-[#FF6B4A]"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  Book Taxi
                </a>
              </li>
              <li>
                <a
                  href="#airport"
                  className="block text-gray-900 font-semibold hover:text-[#FF6B4A]"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  Airport Taxi
                </a>
              </li>
              <li>
                <a
                  href="#safety"
                  className="block text-gray-900 font-semibold hover:text-[#FF6B4A]"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  Safety
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="block text-gray-900 font-semibold hover:text-[#FF6B4A]"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          {/* Social Icons */}
          <div className="mt-auto pt-8">
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
        <Hero />
        <VehicleCards />
        <BrandPositioning />
        <Features />
        <Testimonials />
        <FinalCTA />
        {/* <PaymentMethods /> */}
      </main>

      <Footer />
      
      {/* Mobile Bottom Bar - Fixed */}
      <MobileBottomBar />
    </div>
  );
}
