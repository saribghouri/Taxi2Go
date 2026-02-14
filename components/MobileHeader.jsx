"use client";

import { useState } from "react";
import { Menu, X, Facebook, Instagram, Youtube, Linkedin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const MobileHeader = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
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
            <Image
              src="/assets/images/LOGO 1.png"
              alt="Taxi2Go logo"
              width={120}
              height={30}
            />
          </div>

          {/* Menu Items */}
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

          {/* Phone Number */}
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
    </>
  );
};
