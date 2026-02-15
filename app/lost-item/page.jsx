"use client";

import { useState, useRef } from "react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Phone, CheckCircle, Upload, X, ImageIcon } from "lucide-react";

export default function LostItemPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [images, setImages] = useState([]);
  const [imageError, setImageError] = useState("");
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    ride_date: "",
    pickup_location: "",
    dropoff_location: "",
    vehicle_type: "",
    item_description: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(""); // Clear error on input change
  };

  const handleImageAdd = (e) => {
    const files = Array.from(e.target.files || []);
    setImageError("");

    // Filter to only image files
    const imageFiles = files.filter((file) =>
      ["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type)
    );

    if (imageFiles.length !== files.length) {
      setImageError("Only image files (JPEG, PNG, WebP, GIF) are allowed");
    }

    // Check size (5MB max per file)
    const validFiles = imageFiles.filter((file) => file.size <= 5 * 1024 * 1024);
    if (validFiles.length !== imageFiles.length) {
      setImageError("Each image must be less than 5MB");
    }

    // Check total count
    const totalCount = images.length + validFiles.length;
    if (totalCount > 5) {
      setImageError("Maximum 5 images allowed");
      const allowed = 5 - images.length;
      setImages((prev) => [...prev, ...validFiles.slice(0, allowed)]);
    } else {
      setImages((prev) => [...prev, ...validFiles]);
    }

    // Reset file input so same file can be re-selected
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleImageRemove = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImageError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setImageError("");

    // Validate images
    if (images.length === 0) {
      setImageError("Please upload at least 1 image of the lost item");
      setIsSubmitting(false);
      return;
    }

    try {
      const body = new FormData();
      // Append text fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value) body.append(key, value);
      });
      // Append images
      images.forEach((file) => body.append("images", file));

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/lost-item/report`, {
        method: "POST",
        body,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit report");
      }

      setIsSuccess(true);
      // Reset form
      setFormData({
        full_name: "",
        email: "",
        phone: "",
        ride_date: "",
        pickup_location: "",
        dropoff_location: "",
        vehicle_type: "",
        item_description: "",
        notes: "",
      });
      setImages([]);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white font-sans">
        <Header />
        <main className="pt-32 pb-16 px-4">
          <div className="container mx-auto max-w-2xl">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Report Submitted Successfully!
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Thank you for reporting your lost item. Our team has received your request and will contact you as soon as possible.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setIsSuccess(false)}
                  className="px-8 py-3 bg-[#FF6347] text-white font-bold rounded-full hover:bg-[#e54d2e] transition-colors"
                >
                  Submit Another Report
                </button>
                <a
                  href="/"
                  className="px-8 py-3 bg-gray-200 text-gray-900 font-bold rounded-full hover:bg-gray-300 transition-colors"
                >
                  Back to Home
                </a>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />
      
      <main className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-3xl">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Lost an Item on Your Ride?
            </h1>
            <p className="text-lg text-gray-600">
              Please fill out the form below. Our Taxi2Go team will contact you as soon as possible.
            </p>
          </div>

          {/* Form Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label htmlFor="full_name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6347] focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6347] focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6347] focus:border-transparent"
                  placeholder="+61 412 345 678"
                />
              </div>

              {/* Ride Date */}
              <div>
                <label htmlFor="ride_date" className="block text-sm font-semibold text-gray-700 mb-2">
                  Date of Ride <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="ride_date"
                  name="ride_date"
                  value={formData.ride_date}
                  onChange={handleChange}
                  required
                  max={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6347] focus:border-transparent"
                />
              </div>

              {/* Pickup Location */}
              <div>
                <label htmlFor="pickup_location" className="block text-sm font-semibold text-gray-700 mb-2">
                  Pickup Location
                </label>
                <input
                  type="text"
                  id="pickup_location"
                  name="pickup_location"
                  value={formData.pickup_location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6347] focus:border-transparent"
                  placeholder="Where were you picked up?"
                />
              </div>

              {/* Dropoff Location */}
              <div>
                <label htmlFor="dropoff_location" className="block text-sm font-semibold text-gray-700 mb-2">
                  Drop-off Location
                </label>
                <input
                  type="text"
                  id="dropoff_location"
                  name="dropoff_location"
                  value={formData.dropoff_location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6347] focus:border-transparent"
                  placeholder="Where were you dropped off?"
                />
              </div>

              {/* Vehicle Type */}
              <div>
                <label htmlFor="vehicle_type" className="block text-sm font-semibold text-gray-700 mb-2">
                  Vehicle Type
                </label>
                <select
                  id="vehicle_type"
                  name="vehicle_type"
                  value={formData.vehicle_type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6347] focus:border-transparent"
                >
                  <option value="">Select vehicle type</option>
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Van">Van</option>
                </select>
              </div>

              {/* Item Description */}
              <div>
                <label htmlFor="item_description" className="block text-sm font-semibold text-gray-700 mb-2">
                  Item Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="item_description"
                  name="item_description"
                  value={formData.item_description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6347] focus:border-transparent resize-vertical"
                  placeholder="Please describe the item you lost (color, brand, distinguishing features, etc.)"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Upload Images <span className="text-red-500">*</span>
                  <span className="font-normal text-gray-500 ml-1">({images.length}/5)</span>
                </label>

                {/* Upload area */}
                {images.length < 5 && (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-[#FF6347] hover:bg-orange-50 transition-colors"
                  >
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 font-medium">
                      Click to upload images
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      JPEG, PNG, WebP or GIF — max 5MB each
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      multiple
                      onChange={handleImageAdd}
                      className="hidden"
                    />
                  </div>
                )}

                {/* Error */}
                {imageError && (
                  <p className="mt-2 text-sm text-red-600">{imageError}</p>
                )}

                {/* Image previews */}
                {images.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mt-4">
                    {images.map((file, index) => (
                      <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => handleImageRemove(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Additional Notes */}
              <div>
                <label htmlFor="notes" className="block text-sm font-semibold text-gray-700 mb-2">
                  Additional Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6347] focus:border-transparent resize-vertical"
                  placeholder="Any additional information that might help us locate your item"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#FF6347] text-white font-bold text-lg rounded-lg hover:bg-[#e54d2e] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Report Lost Item"}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-2">Need immediate assistance?</p>
            <a
              href="tel:0424106797"
              className="inline-flex items-center gap-2 text-[#FF6347] font-bold text-lg hover:text-[#e54d2e] transition-colors"
            >
              <Phone className="w-5 h-5" />
              Call us at 0424106797
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
