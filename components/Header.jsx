"use client";

import { Search, Facebook, Instagram, Youtube, Linkedin, Phone } from "lucide-react";
import Image from "next/image";
export const Header = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 px-2 sm:px-4 md:px-6 lg:px-8 pt-4 sm:pt-5 md:pt-6">
      <div className="px-4 sm:px-8 md:px-12 lg:px-[60px] mx-auto flex items-center items-center justify-between">
          <div className="flex-shrink-0">
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
          </div>
        <div className="flex items-center justify-between gap-2 sm:gap-3 md:gap-4 lg:gap-6 bg-[#ffff]/70 backdrop-blur-xs rounded-full px-3 sm:px-4 md:px-5 lg:px-6 py-2 sm:py-2.5 md:py-3">
          {/* Logo */}

          {/* Navigation */}
          <nav className="hidden xl:flex items-center gap-3 lg:gap-5 text-black font-medium">
            <a href="#benefits" className="hover:text-[#FF6347] text-sm md:text-base lg:text-lg xl:text-[18px] transition-colors">
              Benefits
            </a>
            <a href="#specifications" className="hover:text-[#FF6347] text-sm md:text-base lg:text-lg xl:text-[18px]] transition-colors">
              Specifications
            </a>
            <a href="#how-to" className="hover:text-[#FF6347] text-sm md:text-base lg:text-lg xl:text-[18px]] transition-colors">
              How-to
            </a>
            <a href="#contact" className="hover:text-[#FF6347] text-sm md:text-base lg:text-lg xl:text-[18px]] transition-colors">
              Contact Us
            </a>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center bg-white rounded-full px-3 md:px-4 py-1.5 md:py-2 flex-1 max-w-[200px] md:max-w-[350px] lg:max-w-[500px] xl:max-w-[700px]">
            <input type="text" placeholder="" className="flex-1 outline-none text-xs md:text-sm w-full text-gray-700" />
            <Search className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-gray-600" />
          </div>

          {/* Social Icons */}
          <div className="hidden lg:flex items-center gap-1 lg:gap-2">
            <a
              href="#"
              className="w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <Facebook className="w-4 h-4 lg:w-6 lg:h-6 text-gray-400" />
            </a>
            <a
              href="#"
              className="w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <Instagram className="w-4 h-4 lg:w-6 lg:h-6 text-gray-400" />
            </a>
            <a
              href="#"
              className="w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <Youtube className="w-4 h-4 lg:w-6 lg:h-6 text-gray-400" />
            </a>
            <a
              href="#"
              className="w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <Linkedin className="w-4 h-4 lg:w-6 lg:h-6 text-gray-400" />
            </a>
          </div>

          {/* Phone Button */}
          <a
            href="tel:139350"
            className="flex items-center gap-1.5 md:gap-2 hover:bg-white/20 rounded-full px-3 sm:px-4 md:px-5 lg:px-6 py-1.5 md:py-2 text-black font-semibold transition-colors"
          >
            <Phone className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-[#FF6347]" />
            <span className="text-xs sm:text-sm md:text-base">13 9350</span>
          </a>
        </div>
      </div>
    </header>
  );
};
