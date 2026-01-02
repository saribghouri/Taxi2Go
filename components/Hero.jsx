import { BookingForm } from "./BookingForm"

export const Hero = () => {
  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Background Image */}
     <div className="absolute inset-0 z-0 bg-hero">

  {/* Dark Overlay */}
  
</div>

      {/* Content */}
      <div className="container  px-4 relative z-10  flex items-center justify-start pt-32 pb-20">
        <div className="w-full max-w-7xl space-y-6 md:ml-12 lg:ml-16">
          {/* Hero Text Above Booking Form */}
          {/* <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              Book a Taxi in Sydney in Seconds
            </h1>
            <p className="text-xl md:text-2xl text-white/95 mb-3 font-medium">
              Fixed price rides with licensed Sydney taxis. No surge pricing. No delays.
            </p>
            <p className="text-sm md:text-base text-white/80">
              Available 24/7 across Sydney · Instant confirmation
            </p>
          </div> */}
          <BookingForm />
        </div>
      </div>
    </section>
  )
}
