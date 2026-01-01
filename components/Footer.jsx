import React from 'react';
import Image from 'next/image';

export const Footer = () => {
  return <footer className=" text-white pt-16 pb-8">
    <div className="container mx-auto px-4">
      {/* Logo */}
      <div className="mb-8">
        <div className="inline-block relative">
          <Image
            src="/assets/images/LOGO 1.png"
            alt="Taxi2GO logo"
            width={160}
            height={40}
            priority
            className="object-contain"
          />
        </div>
      </div>

      {/* Description */}
      <div className="mb-12 pb-8 border-b border-gray-700">
        <p className="text-black text-lg leading-relaxed max-w-4xl">
          Professional Sydney taxi service operating across the Sydney metropolitan area only.
        </p>
      </div>

      {/* Footer Links Grid */}
      {/* Footer Links Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12 mb-12">

        {/* Services Section */}
        <div>
          <h3 className="text-2xl font-bold text-black mb-6 relative inline-block">
            Services
            <span className="absolute bottom-0 left-0 w-12 h-1 bg-brand-orange"></span>
          </h3>
          <ul className="space-y-3">
        
            <li><a href="#" className="text-black hover:text-brand-orange transition-colors duration-300 block">Sydney Taxi Service</a></li>
            <li><a href="#" className="text-black hover:text-brand-orange transition-colors duration-300 block">Airport Taxi</a></li>
            <li><a href="#" className="text-black hover:text-brand-orange transition-colors duration-300 block">
              Contact Us</a></li>
            <li><a href="#" className="text-black hover:text-brand-orange transition-colors duration-300 block">Book Taxi</a></li>
          </ul>
        </div>

        {/* Company Section */}
        <div>
          <h3 className="text-2xl font-bold text-black mb-6 relative inline-block">
            Coverage
            <span className="absolute bottom-0 left-0 w-12 h-1 bg-brand-orange"></span>
          </h3>
          <ul className="space-y-3">

            <li><a href="#" className="text-black hover:text-brand-orange transition-colors duration-300 block">Northern Beaches</a></li>
            <li><a href="#" className="text-black hover:text-brand-orange transition-colors duration-300 block">Sydney Airport</a></li>
            <li><a href="#" className="text-black hover:text-brand-orange transition-colors duration-300 block">ASydney CBD</a></li>
            <li><a href="#" className="text-black hover:text-brand-orange transition-colors duration-300 block">Parramatta</a></li>
          </ul>
        </div>

        {/* Legal Section */}
        <div>
          <h3 className="text-2xl font-bold text-black mb-6 relative inline-block">
            Trust & Legal
            <span className="absolute bottom-0 left-0 w-12 h-1 bg-brand-orange"></span>
          </h3>
          <ul className="space-y-3">

            <li><a href="#" className="text-black hover:text-brand-orange transition-colors duration-300 block"> Safety & Compliance</a></li>
            <li><a href="#" className="text-black hover:text-brand-orange transition-colors duration-300 block">Terms & Conditions</a></li>
            <li><a href="#" className="text-black hover:text-brand-orange transition-colors duration-300 block">Privacy Policy</a></li>
            <li><a href="#" className="text-black hover:text-brand-orange transition-colors duration-300 block">Refund Policy</a></li>
          </ul>
        </div>

      </div>

      {/* Copyright */}
      <div className="pt-8 border-t border-gray-700">
        <div className="text-center">
          <p className="text-gray-600 text-sm">
            © 2025 Taxi2Go Pty Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>;
};