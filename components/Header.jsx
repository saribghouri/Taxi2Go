"use client";

import { useState } from "react";
import { Phone, Menu, X, Facebook, Instagram, Youtube, Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      {/* Desktop Header - hidden on mobile */}
      <header className="hidden lg:block absolute top-0 left-0 right-0 z-50 px-2 sm:px-4 md:px-6 lg:px-8 pt-4 sm:pt-5 md:pt-6">
        <div className="px-4 sm:px-8 md:px-12 lg:px-[60px] mx-auto flex items-center justify-between">
          <Link href="/" className="flex-shrink-0">
            <div className="relative w-[120px] sm:w-[150px] md:w-[180px] lg:w-[200px] h-[40px] sm:h-[50px] md:h-[55px] lg:h-[60px]">
              <div className="flex items-center mt-[-12px] sm:mt-[-14px] md:mt-[-16px] lg:mt-[-18px]">
                <Image
                  src="/assets/images/LOGO 1.png"
                  alt="Taxi2Go logo"
                  width={200}
                  height={40}
                  priority
                  className="w-full h-auto"
                />
              </div>
            </div>
          </Link>

          <div className="flex items-center justify-between w-[80%] gap-2 sm:gap-3 md:gap-4 lg:gap-6 bg-[#ffff]/70 backdrop-blur-xs rounded-full px-3 sm:px-4 md:px-5 lg:px-8 py-2 sm:py-2.5 md:py-3">
            <nav className="flex items-center gap-3 lg:gap-10 text-black font-bold whitespace-nowrap">
              <Link
                href="/#home"
                className="hover:text-[#FF6347] text-sm md:text-base lg:text-lg xl:text-[20px] transition-colors"
              >
                Home
              </Link>
              <Link
                href="/#about"
                className="hover:text-[#FF6347] text-sm md:text-base lg:text-lg xl:text-[20px] transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/#services"
                className="hover:text-[#FF6347] text-sm md:text-base lg:text-lg xl:text-[20px] transition-colors"
              >
                Services
              </Link>
              <Link
                href="/lost-item"
                className="hover:text-[#FF6347] text-sm md:text-base lg:text-lg xl:text-[20px] transition-colors"
              >
                Lost Item
              </Link>
              <Link
                href="/#contact"
                className="hover:text-[#FF6347] text-sm md:text-base lg:text-lg xl:text-[20px] transition-colors"
              >
                Contact Us
              </Link>
            </nav>

            <div className=" flex justify-between items-center gap-[60px]">
              <div className="mt-[11px]">
                <a
                  href="tel:0424106797"
                  className="flex items-center gap-1.5 md:gap-2 rounded-full px-3 sm:px-4 md:px-5 lg:px-6 py-1.5 md:py-2 text-white bg-[#FF6347] hover:bg-[#e54d2e] font-bold transition-colors animate-bounce"
                  style={{
                    animation: "bounce 1s infinite",
                  }}
                >
                  <Phone className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white" />
                  <span className="text-xs sm:text-sm md:text-base">
                    Call Now
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Header - visible only on mobile */}
      <nav className="lg:hidden fixed top-0 left-0 w-full z-50 bg-white shadow-sm px-4 py-4 flex justify-between items-center gap-4">
        <button
          type="button"
          className="text-gray-900 cursor-pointer"
          aria-label="Open menu"
          onClick={() => setIsDrawerOpen(true)}
        >
          <Menu size={28} strokeWidth={2.5} />
        </button>

        <Link href="/" className="flex items-center">
          <Image
            src="/assets/images/LOGO 1.png"
            alt="Taxi2Go logo"
            width={140}
            height={36}
            priority
          />
        </Link>

        <a
          href="tel:0424106797"
          className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-white bg-[#FF6347] hover:bg-[#e54d2e] font-semibold text-sm transition-colors whitespace-nowrap animate-bounce"
          style={{
            animation: "bounce 1s infinite",
          }}
        >
          <Phone className="w-4 h-4" />
          <span className="hidden sm:inline">Call Now</span>
        </a>
      </nav>

      {/* Mobile Drawer + Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-50"
          onClick={() => setIsDrawerOpen(false)}
          aria-hidden="true"
        />
      )}
      
      <div
        className={`fixed top-0 left-0 h-full w-72 max-w-[80vw] bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        <div className="relative h-full p-6 flex flex-col">
          <button
            type="button"
            className="absolute top-4 right-4 text-gray-900"
            aria-label="Close menu"
            onClick={() => setIsDrawerOpen(false)}
          >
            <X size={24} />
          </button>

          <div className="mb-8">
            <Image
              src="/assets/images/LOGO 1.png"
              alt="Taxi2Go logo"
              width={120}
              height={30}
            />
          </div>

          <nav className="mt-2">
            <ul className="space-y-4">
              <li>
                <Link
                  href="/#home"
                  className="block text-gray-900 font-semibold hover:text-[#FF6B4A]"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  className="block text-gray-900 font-semibold hover:text-[#FF6B4A]"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  className="block text-gray-900 font-semibold hover:text-[#FF6B4A]"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/lost-item"
                  className="block text-gray-900 font-semibold hover:text-[#FF6B4A]"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  Lost Item
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="block text-gray-900 font-semibold hover:text-[#FF6B4A]"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </nav>

          <div className="mt-auto pt-8 border-t border-gray-200">
            <a
              href="tel:0424106797"
              className="flex items-center justify-center gap-2 px-4 py-3 bg-[#FF6347] hover:bg-[#e54d2e] text-white font-bold rounded-full transition-colors shadow-lg"
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
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span className="text-base">0424106797</span>
            </a>
          </div>

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
    </>
  );
};
