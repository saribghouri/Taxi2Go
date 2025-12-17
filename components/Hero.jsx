import { BookingForm } from "./BookingForm"

export const Hero = () => {
  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Background Image */}
     <div className="absolute inset-0 z-0 bg-hero">

  {/* Dark Overlay */}
  
</div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 min-h-screen flex items-center pt-32 pb-20">
        <div className="w-full max-w-7xl">
          <BookingForm />
        </div>
      </div>
    </section>
  )
}
