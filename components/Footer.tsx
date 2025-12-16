import React from 'react';
import { Instagram, Linkedin, Twitter, Youtube, Facebook } from 'lucide-react';
import Image from 'next/image';
// TikTok icon isn't in standard Lucide set yet, create custom
const TikTok = ({
  size = 20,
  className = ''
}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>;
export const Footer = () => {
  return <footer className="bg-white pt-16 pb-8 border-t border-gray-100">
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

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Description */}
          <div className="md:col-span-5">
            <p className="text-black leading-relaxed mb-8">
              Whether you're heading out for the evening, on your way to an
              important meeting, or meeting up with friends, your Silver Top
              taxi is always close by. Founded in 1936, Silver Top has grown to
              become a trusted name in everyday taxi travel across Melbourne and
              Sydney. With a large fleet of vehicles and a dedicated customer
              support team, our fully accredited drivers are committed to
              providing a safe, reliable, and comfortable ride every time.
            </p>
          </div>

          {/* Services Links */}
          <div className="md:col-span-7">
            <h3 className="text-[30px] font-bold text-black mb-6">Services</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              <a href="#" className="text-black font-medium hover:text-brand-orange">
                Airport Taxi Services
              </a>
              <a href="#" className="text-black font-medium hover:text-brand-orange">
                Terms & Conditions
              </a>
              <a href="#" className="text-black font-medium hover:text-brand-orange">
                Parcel Delivery Services
              </a>
              <a href="#" className="text-black font-medium hover:text-brand-orange">
                Sydney Taxi Blog
              </a>
              <a href="#" className="text-black font-medium hover:text-brand-orange">
                App
              </a>
              <a href="#" className="text-black font-medium hover:text-brand-orange">
                For Business
              </a>
              <a href="#" className="text-black font-medium hover:text-brand-orange">
                Privacy Policy
              </a>
              <a href="#" className="text-black font-medium hover:text-brand-orange">
                Corporate Sign In
              </a>
            </div>
          </div>
        </div>

        {/* Social & Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-100">
          <div className="flex space-x-6 mb-6 md:mb-0">
            <a href="#" className="text-gray-900 hover:text-brand-orange">
              <Instagram size={24} />
            </a>
            <a href="#" className="text-gray-900 hover:text-brand-orange">
              <Linkedin size={24} />
            </a>
            <a href="#" className="text-gray-900 hover:text-brand-orange">
              <Twitter size={24} />
            </a>
            <a href="#" className="text-gray-900 hover:text-brand-orange">
              <TikTok size={24} />
            </a>
            <a href="#" className="text-gray-900 hover:text-brand-orange">
              <Youtube size={24} />
            </a>
            <a href="#" className="text-gray-900 hover:text-brand-orange">
              <Facebook size={24} />
            </a>
          </div>

          <div className="text-gray-900 font-medium">
            Copyright © 2025 Taxi2GO Pty Ltd
          </div>
        </div>
      </div>
    </footer>;
};