"use client";

import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { DollarSign, Clock, CreditCard, Mail } from "lucide-react";

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />
      
      <main className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <DollarSign className="w-16 h-16 text-[#FF6347]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Refund Policy
            </h1>
            <p className="text-lg text-gray-600">
              Transparent and fair refund practices
            </p>
          </div>

          {/* Content Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 space-y-8">
            <div>
              <p className="text-lg text-gray-700 leading-relaxed">
                Taxi2Go operates under <strong>The Captain Taxis Pty Ltd</strong>. Our goal is to provide transparent and fair refund practices.
              </p>
            </div>

            <div className="space-y-8">
              {/* Section 1 */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 bg-[#FF6347] text-white rounded-full text-sm font-bold">1</span>
                  Refund Eligibility
                </h2>
                <div className="ml-11 space-y-3">
                  <p className="text-gray-700">
                    • Refunds are considered for overcharges, technical errors, or cancellations initiated by Taxi2Go.
                  </p>
                  <p className="text-gray-700">
                    • Refunds are not provided for service dissatisfaction due to traffic, weather, or rider behavior.
                  </p>
                </div>
              </div>

              {/* Section 2 */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Clock className="w-6 h-6 text-[#FF6347]" />
                  Cancellation Refunds
                </h2>
                <div className="ml-11 space-y-3">
                  <p className="text-gray-700">
                    • If you cancel a booking before the cutoff time (e.g., 30 minutes before pickup), you are eligible for a full refund.
                  </p>
                  <p className="text-gray-700">
                    • Late cancellations may incur a cancellation fee deducted from the refund.
                  </p>
                </div>
              </div>

              {/* Section 3 */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <CreditCard className="w-6 h-6 text-[#FF6347]" />
                  Payment Refunds
                </h2>
                <div className="ml-11 space-y-3">
                  <p className="text-gray-700">
                    • Card payments will be refunded to the original payment method.
                  </p>
                  <p className="text-gray-700">
                    • Refunds may take up to 5–7 business days to process.
                  </p>
                </div>
              </div>

              {/* Section 4 */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Mail className="w-6 h-6 text-[#FF6347]" />
                  How to Request a Refund
                </h2>
                <div className="ml-11">
                  <p className="text-gray-700 mb-3">
                    Contact{" "}
                    <a href="mailto:support@taxi2go.com.au" className="text-[#FF6347] hover:underline font-medium">
                      support@taxi2go.com.au
                    </a>{" "}
                    with your booking details and reason for refund.
                  </p>
                  <p className="text-gray-700">
                    Our team will review and process the request promptly.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-8">
              <p className="text-lg text-gray-800 font-medium text-center">
                We aim to make every ride seamless, but if issues arise, our refund policy ensures fairness and clarity.
              </p>
            </div>

            <div className="bg-orange-50 border-l-4 border-[#FF6347] p-6 mt-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Need Help?</h3>
              <p className="text-gray-700 mb-3">
                If you have any questions about refunds or need assistance with your request, our support team is here to help.
              </p>
              <div className="space-y-1">
                <p className="text-gray-900">
                  <strong>Email:</strong>{" "}
                  <a href="mailto:support@taxi2go.com.au" className="text-[#FF6347] hover:underline">
                    support@taxi2go.com.au
                  </a>
                </p>
                <p className="text-gray-900">
                  <strong>Phone:</strong>{" "}
                  <a href="tel:0424106797" className="text-[#FF6347] hover:underline">
                    0424106797
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
