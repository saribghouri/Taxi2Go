import { BookingForm } from "./BookingForm"

export const Hero = () => {
  return (
    <section id="hero" className="relative w-full min-h-screen overflow-hidden">
      {/* Background Image/Dark Overlay */}
      <div className="absolute inset-0 z-0 bg-hero" />

      {/* Content */}
      <div className="px-4 md:px-10 sm:px-8 relative z-10  sm:pt-32 sm:pb-20 pt-20 pb-6 w-full flex items-center justify-center">
        <div className="w-full max-w-7xl space-y-6 ">
          <BookingForm />
        </div>
      </div>
    </section>
  )
}
