import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { ADLaM_Display } from 'next/font/google'

const adlamDisplay = ADLaM_Display({ 
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

const testimonials = [
  {
    id: 1,
    name: 'Mark H.',
    location: 'Sydney CBD',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    rating: 5,
    text: 'Booked online in under a minute. Driver arrived early. Solid service.'
  },
  {
    id: 2,
    name: 'Sarah K.',
    location: 'Mascot',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    rating: 5,
    text: 'Best option for airport runs. I always book my airport taxi with Taxi2Go.'
  },
  {
    id: 3,
    name: 'Daniel P.',
    location: 'Parramatta',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    rating: 5,
    text: 'Easy Sydney cab booking, clean car, polite driver.'
  }
];

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className={`text-3xl md:text-[48px] font-bold text-center text-gray-900 mb-16 ${adlamDisplay.className}`}>
        Real reviews
        </h2>

        {/* Mobile: single-card slider with dots */}
        <div className="block md:hidden">
          <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 border border-gray-100">
            <div className="flex flex-row gap-6 items-start">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md flex-shrink-0">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900">
                  {testimonials[currentIndex].name}
                </h3>
                <p className="text-sm text-gray-500 mb-3">
                  {testimonials[currentIndex].location}
                </p>

                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            </div>

            <p className="text-black leading-relaxed text-lg mt-6">
              {testimonials[currentIndex].text}
            </p>
          </div>

          <div className="flex items-center justify-center gap-8 mt-6">
            <button onClick={prevSlide} className="w-12 h-12 rounded-full border-2 border-gray-900 flex items-center justify-center hover:bg-gray-900 hover:text-white transition-colors">
              <ChevronLeft size={24} />
            </button>

            <div className="flex gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${index === currentIndex ? 'bg-[#FC5E39]' : 'bg-gray-300'}`}
                />
              ))}
            </div>

            <button onClick={nextSlide} className="w-12 h-12 rounded-full border-2 border-gray-900 flex items-center justify-center hover:bg-gray-900 hover:text-white transition-colors">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Desktop: show all three cards, no arrows */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map(testimonial => (
            <div
              key={testimonial.id}
              className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 md:p-10 border border-gray-100 h-full flex flex-col"
            >
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-white shadow-md flex-shrink-0">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">{testimonial.location}</p>

                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-black leading-relaxed text-base md:text-lg mt-4 flex-1">
                {testimonial.text}
              </p>
            </div>
          ))}
        </div>

        {/* Final CTA Section */}
        <div className="w-full mt-16 mb-2 flex flex-col items-center justify-center bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 rounded-3xl shadow-2xl py-10 px-6 md:px-12 animate-in fade-in duration-700">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3 drop-shadow-lg tracking-tight">Need a Taxi Right Now?</h2>
          <p className="text-lg md:text-xl text-white/90 mb-6 text-center max-w-2xl drop-shadow">Book a taxi near you in Sydney — fast, simple, and reliable.</p>
          <button 
            onClick={() => {
              if (typeof window !== 'undefined') {
                document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="bg-white text-orange-600 font-bold text-lg md:text-xl px-8 py-4 rounded-full shadow-lg hover:bg-orange-100 transition-all duration-200 scale-105 hover:scale-110"
          >
            Book Taxi Now
          </button>
        </div>
      </div>
    </section>
  );
};