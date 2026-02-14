"use client";

import { Header } from "../../components/Header";
import { MobileHeader } from "../../components/MobileHeader";
import { Footer } from "../../components/Footer";
import { Shield, CheckCircle, Heart, AlertCircle } from "lucide-react";

export default function SafetyCompliancePage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <div className="hidden lg:block">
        <Header />
      </div>
      <MobileHeader />
      
      <main className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <Shield className="w-16 h-16 text-[#FF6347]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Safety & Compliance
            </h1>
            <p className="text-lg text-gray-600">
              Your safety is our top priority
            </p>
          </div>

          {/* Content Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 space-y-8">
            <div>
              <p className="text-lg text-gray-700 leading-relaxed">
                At Taxi2Go, your safety is our top priority. Operating under <strong>The Captain Taxis Pty Ltd</strong>, we strictly adhere to all local and state regulations for passenger transport in Australia.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                Our Commitments
              </h2>

              <div className="space-y-6">
                <div className="border-l-4 border-[#FF6347] pl-6 py-2">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Licensed Drivers</h3>
                  <p className="text-gray-700">
                    All our drivers hold valid taxi licences and have undergone rigorous background checks.
                  </p>
                </div>

                <div className="border-l-4 border-[#FF6347] pl-6 py-2">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Vehicle Standards</h3>
                  <p className="text-gray-700">
                    Every vehicle is regularly inspected and maintained to meet safety standards.
                  </p>
                </div>

                <div className="border-l-4 border-[#FF6347] pl-6 py-2">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">COVID & Health Safety</h3>
                  <p className="text-gray-700">
                    Vehicles are sanitized regularly, and drivers follow all recommended health protocols.
                  </p>
                </div>

                <div className="border-l-4 border-[#FF6347] pl-6 py-2">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Passenger Safety</h3>
                  <p className="text-gray-700">
                    Child seats and wheelchair-accessible vehicles are available upon request to ensure safety for all passengers.
                  </p>
                </div>

                <div className="border-l-4 border-[#FF6347] pl-6 py-2">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Compliance with Law</h3>
                  <p className="text-gray-700">
                    We comply with all NSW transport and road safety regulations.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-[#FF6347]" />
                Reporting Issues
              </h2>
              <p className="text-gray-700 mb-4">
                If you experience any safety concerns during your ride, please contact our support team immediately:
              </p>
              <div className="space-y-2">
                <p className="text-gray-900">
                  <strong>Email:</strong>{" "}
                  <a href="mailto:support@taxi2go.com.au" className="text-[#FF6347] hover:underline">
                    support@taxi2go.com.au
                  </a>
                </p>
                <p className="text-gray-900">
                  <strong>Phone:</strong>{" "}
                  <a href="tel:+61412345678" className="text-[#FF6347] hover:underline">
                    +61 412 345 678
                  </a>
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <Heart className="w-12 h-12 text-[#FF6347] mx-auto mb-4" />
              <p className="text-lg text-gray-800 font-medium">
                Your safety is our responsibility, and we are committed to providing a secure, comfortable, and reliable ride every time.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
