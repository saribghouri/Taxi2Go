"use client";

import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Lock, Shield, Eye, Database, UserCheck } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />
      
      <main className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <Lock className="w-16 h-16 text-[#FF6347]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600">
              Your privacy and data protection are important to us
            </p>
          </div>

          {/* Content Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 space-y-8">
            <div>
              <p className="text-lg text-gray-700 leading-relaxed">
                Taxi2Go, operating under <strong>The Captain Taxis Pty Ltd</strong>, is committed to protecting your personal information in compliance with the <strong>Privacy Act 1988 (Cth)</strong>.
              </p>
            </div>

            <div className="space-y-8">
              {/* Section 1 */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Database className="w-6 h-6 text-[#FF6347]" />
                  Information We Collect
                </h2>
                <ul className="space-y-2 ml-9">
                  <li className="text-gray-700">• Name, email, phone number, and booking details</li>
                  <li className="text-gray-700">• Payment information for processing transactions</li>
                  <li className="text-gray-700">• Location data for pickups and drop-offs</li>
                </ul>
              </div>

              {/* Section 2 */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Eye className="w-6 h-6 text-[#FF6347]" />
                  How We Use Your Information
                </h2>
                <ul className="space-y-2 ml-9">
                  <li className="text-gray-700">• To process bookings and payments</li>
                  <li className="text-gray-700">• To improve our services and user experience</li>
                  <li className="text-gray-700">• For marketing communications (with your consent)</li>
                  <li className="text-gray-700">• To comply with legal obligations</li>
                </ul>
              </div>

              {/* Section 3 */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Shield className="w-6 h-6 text-[#FF6347]" />
                  Sharing Your Information
                </h2>
                <ul className="space-y-2 ml-9">
                  <li className="text-gray-700">• We do not sell your data to third parties.</li>
                  <li className="text-gray-700">• We may share your information with service providers involved in completing your ride (e.g., payment processors).</li>
                </ul>
              </div>

              {/* Section 4 */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Lock className="w-6 h-6 text-[#FF6347]" />
                  Data Security
                </h2>
                <ul className="space-y-2 ml-9">
                  <li className="text-gray-700">• We implement strict security measures to protect your data.</li>
                  <li className="text-gray-700">• Payment information is securely processed via Stripe or other approved gateways.</li>
                </ul>
              </div>

              {/* Section 5 */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <UserCheck className="w-6 h-6 text-[#FF6347]" />
                  Your Rights
                </h2>
                <div className="ml-9">
                  <p className="text-gray-700 mb-3">
                    You can request access, correction, or deletion of your personal information.
                  </p>
                  <p className="text-gray-700">
                    Contact us at{" "}
                    <a href="mailto:privacy@taxi2go.com.au" className="text-[#FF6347] hover:underline font-medium">
                      privacy@taxi2go.com.au
                    </a>{" "}
                    for any requests.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
              <p className="text-lg text-gray-800">
                By using our services, you consent to the collection and use of your information as outlined in this policy.
              </p>
            </div>

            <div className="text-center text-sm text-gray-500 mt-8">
              <p>Last updated: February 2026</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
