import { MapPin, ChevronDown, Send } from "lucide-react";
import { Button } from "./ui/Button";
import Image from "next/image";
export const BookingForm = () => {
  return (
    <div className="bg-white/50 backdrop-blur-xs p-6 rounded-3xl shadow-xl w-full max-w-md mx-auto">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-tight mb-2">
          Book a Taxi in Seconds
        </h2>
        <p className="text-sm font-semibold text-black uppercase tracking-wide leading-relaxed">
          Fixed Price, On-time Picked, Local Sydney Drivers. No Surge. No Drama.
        </p>
      </div>

      <form className="space-y-3 mb-6">
        {/* Pickup */}
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
       <Image src="/assets/images/basil_location-outline.png" alt="" width={20} height={20} />
          </div>
          <input
            type="text"
            placeholder="Your Picked Location"
            className="w-full pl-12 pr-10 py-3.5 bg-white border-1 border-[#FF6B4A] rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#FF6B4A]/50"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Send size={16} className="transform rotate-45" />
            
          </div>
        </div>

        {/* Dropoff */}
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
            {/* <MapPin size={20} /> */}
                        <Image src="/assets/images/Frame 40.png" alt="" width={15} height={15} />

          </div>
          <input
            type="text"
            placeholder="Drop off Location"
            className="w-full pl-12 pr-4 py-3.5 bg-white border-1 border-[#FF6B4A] rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#FF6B4A]/50"
          />
        </div>

        {/* Date/Time */}
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <Image src="/assets/images/Vector (1).png" alt="" width={20} height={20} />
          </div>
          <input
            type="text"
            placeholder="Drop off Location" // The image actually repeats "Drop off Location" or similar in the 3rd field, likely a UI mock error, but usually this is Date/Time or Vehicle type. I'll stick to the visual which looks like a dropdown.
            defaultValue="Drop off Location"
            className="w-full pl-12 pr-10 py-3.5 bg-white border-1 border-[#FF6B4A] rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#FF6B4A]/50 appearance-none"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
            <ChevronDown size={20} />
          </div>
        </div>

        <Button
          className="w-full rounded-full py-3 text-lg font-bold uppercase tracking-wider mt-4 shadow-lg shadow-brand-orange/30"
          style={{
            backgroundColor: "#FC5E39",
          }}
        >
          Booking
        </Button>
      </form>

      {/* Stats */}
      <div className="flex justify-center items-center gap-8 pt-2 ">
        <div className="text-center flex justify-center items-center flex-col">
          <div className="text-2xl mb-1 "><Image src="/assets/images/fluent-color_people-48.png" alt="" width={45} height={30} /></div>
       
            <div className="font-bold text-gray-900 text-[25px] leading-none">
         50,408
          </div>
          <div className="text-xs text-gray-600 font-medium">Happy Rides</div>
        </div>
        <div className="h-20 w-px bg-gray-300"></div>
        {/* <div className="text-center">
          <div className="text-2xl mb-1 flex justify-center"><Image src="/assets/images/Group.png" alt="" width={50} height={50} /></div>
          <div className="font-bold text-gray-900 text-[25px] leading-none">
            4.9/5 
          </div>
          <div className="text-xs text-gray-600 font-medium">Rating</div>
        </div> */}
          <div className="text-center flex justify-center items-center flex-col">
          <div className="text-2xl mt-[10px] "><Image src="/assets/images/Group.png" alt="" width={50} height={60} /></div>
       
            <div className="font-bold text-gray-900 text-[25px] mt-[10px] leading-none">
          4.9/5 
          </div>
          <div className="text-xs text-gray-600 font-medium">Happy Rides</div>
        </div>
      </div>
    </div>
  );
};
