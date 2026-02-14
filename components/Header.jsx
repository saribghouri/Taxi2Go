"use client";

import { Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 px-2 sm:px-4 md:px-6 lg:px-8 pt-4 sm:pt-5 md:pt-6">
      <div className="px-4 sm:px-8 md:px-12 lg:px-[60px] mx-auto flex items-center items-center justify-between">
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
          <nav className="hidden xl:flex items-center gap-3 lg:gap-10 text-black font-bold">
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
                className="flex items-center gap-1.5 md:gap-2 hover:bg-white/20 rounded-full px-3 sm:px-4 md:px-5 lg:px-6 py-1.5 md:py-2 text-white bg-[#FF6347] hover:bg-[#e54d2e] font-bold transition-colors animate-bounce"
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
  );
};
