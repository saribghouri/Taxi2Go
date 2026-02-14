"use client";

import { Header } from "../../components/Header";
import { MobileHeader } from "../../components/MobileHeader";
import { Footer } from "../../components/Footer";
import { FileText, CheckCircle } from "lucide-react";

export default function TermsConditionsPage() {
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
              <FileText className="w-16 h-16 text-[#FF6347]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Terms & Conditions
            </h1>
            <p className="text-lg text-gray-600">
              Please read these terms carefully before using our services
            </p>
          </div>

          {/* Content Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 space-y-8">
            <div>
              <p className="text-lg text-gray-700 leading-relaxed">
                Welcome to Taxi2Go, a brand operated by <strong>The Captain Taxis Pty Ltd</strong>. By using our services, you agree to the following terms:
              </p>
            </div>

            <div className="space-y-8">
              {/* Section 1 */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 bg-[#FF6347] text-white rounded-full text-sm font-bold">1</span>
                  Booking
                </h2>
                <ul className="space-y-2 ml-11">
                  <li className="text-gray-700 flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>All rides are booked via the Taxi2Go platform.</span>
                  </li>
                  <li className="text-gray-700 flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Prices are fixed at the time of booking and are inclusive of GST.</span>
                  </li>
                </ul>
              </div>

              {/* Section 2 */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 bg-[#FF6347] text-white rounded-full text-sm font-bold">2</span>
                  Payment
                </h2>
                <ul className="space-y-2 ml-11">
                  <li className="text-gray-700 flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>We accept card payments, cash, and other approved methods.</span>
                  </li>
                  <li className="text-gray-700 flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>For card payments, you authorize Taxi2Go to charge the amount specified during booking.</span>
                  </li>
                </ul>
              </div>

              {/* Section 3 */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 bg-[#FF6347] text-white rounded-full text-sm font-bold">3</span>
                  Cancellations & Refunds
                </h2>
                <ul className="space-y-2 ml-11">
                  <li className="text-gray-700 flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>You may cancel your ride before the scheduled pickup time.</span>
                  </li>
                  <li className="text-gray-700 flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Cancellation fees may apply if canceled late (see Refund Policy).</span>
                  </li>
                </ul>
              </div>

              {/* Section 4 */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 bg-[#FF6347] text-white rounded-full text-sm font-bold">4</span>
                  Use of Service
                </h2>
                <ul className="space-y-2 ml-11">
                  <li className="text-gray-700 flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Riders must behave respectfully toward drivers and other passengers.</span>
                  </li>
                  <li className="text-gray-700 flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Illegal activities or unsafe behavior during the ride may result in service termination.</span>
                  </li>
                </ul>
              </div>

              {/* Section 5 */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 bg-[#FF6347] text-white rounded-full text-sm font-bold">5</span>
                  Liability
                </h2>
                <ul className="space-y-2 ml-11">
                  <li className="text-gray-700 flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Taxi2Go, as a brand under The Captain Taxis Pty Ltd, is not liable for personal items left in the vehicle.</span>
                  </li>
                  <li className="text-gray-700 flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>While we prioritize safety, Taxi2Go is not responsible for delays caused by traffic, weather, or unforeseen circumstances.</span>
                  </li>
                </ul>
              </div>

              {/* Section 6 */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 bg-[#FF6347] text-white rounded-full text-sm font-bold">6</span>
                  Intellectual Property
                </h2>
                <p className="text-gray-700 ml-11">
                  All content on the Taxi2Go platform is owned by The Captain Taxis Pty Ltd and may not be copied or reused without permission.
                </p>
              </div>

              {/* Section 7 */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 bg-[#FF6347] text-white rounded-full text-sm font-bold">7</span>
                  Changes to Terms
                </h2>
                <p className="text-gray-700 ml-11">
                  Taxi2Go reserves the right to update these terms at any time. Updates will be posted on the website.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 text-center mt-8">
              <p className="text-lg text-gray-800 font-medium">
                By using Taxi2Go, you agree to abide by these terms.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
