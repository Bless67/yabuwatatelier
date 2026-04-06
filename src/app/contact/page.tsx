"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  
  FaWhatsapp,
} from "react-icons/fa";

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

const PHONE = process.env.NEXT_PUBLIC_PHONE!;
const EMAIL = process.env.NEXT_PUBLIC_EMAIL!;
const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP!;
const ADDRESS = process.env.NEXT_PUBLIC_ADDRESS!;

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Sending your message...");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone || "Not provided",
          subject: formData.subject,
          message: formData.message,
        },
        EMAILJS_PUBLIC_KEY
      );

      toast.success("Message sent! We'll get back to you soon.", {
        id: toastId,
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("EmailJS error:", error);
      toast.error("Failed to send message. Please try again.", {
        id: toastId,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-linear-to-r from-[#1a4d3e] to-[#2d5a52] text-white py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            Get in Touch
          </h1>
          <p className="text-base sm:text-lg text-[#c5d5cf] max-w-2xl">
            We&apos;d love to hear from you. Send us a message and we&apos;ll
            respond as soon as possible.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 sm:p-8 md:p-10 rounded-xl border border-gray-200 shadow-lg">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1a4d3e] mb-6">
                Send us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-[#1a4d3e] mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b8a876] transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#1a4d3e] mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b8a876] transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Phone & Subject */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-[#1a4d3e] mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+234 (0) 123 456 7890"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b8a876] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#1a4d3e] mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="How can we help?"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b8a876] transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-[#1a4d3e] mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us more about your inquiry..."
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b8a876] transition-colors resize-none"
                    required
                  />
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#b8a876] hover:bg-[#1a4d3e] text-white font-bold py-3 rounded-lg transition-all duration-300 disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Phone */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="shrink-0">
                    <FaPhone className="text-2xl text-[#b8a876]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#1a4d3e] mb-1">
                      Phone
                    </h3>
                    <a
                      href={`tel:${PHONE}`}
                      className="text-gray-600 text-sm hover:text-[#1a4d3e] transition-colors"
                    >
                      {PHONE}
                    </a>
                    <p className="text-gray-500 text-xs mt-2">
                      Mon - Fri, 9am - 6pm
                    </p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="shrink-0">
                    <FaEnvelope className="text-2xl text-[#b8a876]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#1a4d3e] mb-1">
                      Email
                    </h3>
                    <a
                      href={`mailto:${EMAIL}`}
                      className="text-gray-600 text-sm hover:text-[#1a4d3e] transition-colors break-all"
                    >
                      {EMAIL}
                    </a>
                    <p className="text-gray-500 text-xs mt-2">
                      We&apos;ll reply within 24 hours
                    </p>
                  </div>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="shrink-0">
                    <FaWhatsapp className="text-2xl text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#1a4d3e] mb-1">
                      WhatsApp
                    </h3>
                    <a
                      href={`https://wa.me/${WHATSAPP}`}
                      className="text-green-600 hover:text-green-700 font-medium text-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Chat with us
                    </a>
                    <p className="text-gray-500 text-xs mt-2">
                      Quick responses available
                    </p>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="shrink-0">
                    <FaMapMarkerAlt className="text-2xl text-[#b8a876]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#1a4d3e] mb-1">
                      Address
                    </h3>
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(ADDRESS)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 text-sm hover:text-[#1a4d3e] transition-colors"
                    >
                      {ADDRESS}
                    </a>
                  </div>
                </div>
              </div>

            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}