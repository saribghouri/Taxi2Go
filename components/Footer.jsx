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

      {/* Description */}
      <div className="mb-12 border-t border-gray-600 ">
        <p className="text-black text-[18px] font-medium  pt-6 leading-relaxed max-w-5xl">
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
      <div className="mb-16">
        <h3 className="text-[30px] font-bold text-black mb-6">Services</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-3">
          <div className=' flex flex-col gap-2 font-bold text-[20px]'>
            <a href="#" className="text-black  hover:text-brand-orange">
              Airport Taxi Services
            </a>
          
            <a href="#" className="text-black  hover:text-brand-orange">
              Parcel Delivery Services
            </a>
                <a href="#" className="text-black  hover:text-brand-orange">
              App
            </a>
             <a href="#" className="text-black  hover:text-brand-orange">
              Privacy Policy
            </a>
          </div>
          <div className=' flex flex-col  gap-2 text-[20px] font-bold'>
           
            <a href="#" className="text-black  hover:text-brand-orange">
              For Business
            </a>
              <a href="#" className="text-black  hover:text-brand-orange">
              Terms & Conditions
            </a>
           <a href="#" className="text-black  hover:text-brand-orange">
              Sydney Taxi Blog
            </a>
          
            <a href="#" className="text-black  hover:text-brand-orange">
              Corporate Sign In
            </a>
          </div>



        </div>
             <div className="flex flex-col md:flex-row justify-between items-center pt-8 ">
        <div className="flex space-x-6 mb-6 md:mb-0">
          <a href="#" className="hover:opacity-80">
            <Image src="/assets/icons/Social link 1.png" alt="Instagram" width={24} height={24} />
          </a>
          <a href="#" className="hover:opacity-80">
            <Image src="/assets/icons/Social link 2.png" alt="LinkedIn" width={24} height={24} />
          </a>
          <a href="#" className="hover:opacity-80">
            <Image src="/assets/icons/Social link 3.png" alt="Twitter" width={24} height={24} />
          </a>
          <a href="#" className="hover:opacity-80">
            <Image src="/assets/icons/streamline-logos_tiktok-logo-block.png" alt="TikTok" width={24} height={24} />
          </a>
          <a href="#" className="hover:opacity-80">
            <Image src="/assets/icons/mdi_youtube.png" alt="YouTube" width={26} height={26} />
          </a>
          <a href="#" className="hover:opacity-80">
            <Image src="/assets/icons/uil_facebook.png" alt="Facebook" width={24} height={24} />
          </a>
        </div>

      </div>
      </div>

      {/* Social & Copyright */}
      
        <div className="text-gray-900 font-medium text-[20px] flex justify-center">
          Copyright © 2025 Taxi2GO Pty Ltd
        </div>
    </div>
  </footer>;
};