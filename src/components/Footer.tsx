"use client";

import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#1a4d3e] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#b8a876]">About Us</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              We offer premium quality products handpicked for you. Shop with
              confidence with our 100% satisfaction guarantee.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#b8a876]">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/catalog"
                  className="text-gray-300 hover:text-[#b8a876] transition-colors"
                >
                  Shop Now
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-[#b8a876] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-[#b8a876] transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-[#b8a876] transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

        

          {/* Contact & Social */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#b8a876]">
              Connect With Us
            </h3>
            <p className="text-sm text-gray-300 mb-4">
              Follow us on social media for updates and exclusive offers.
            </p>
            <div className="flex gap-4">
              <a
                href="https://wa.me/+2349161107183"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-[#b8a876] transition-colors"
              >
                <FaWhatsapp size={24} />
              </a>
              <a
                href="https://facebook.com/YabuwatAtelier"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-[#b8a876] transition-colors"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://instagram.com/YabuwatAtelier"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-[#b8a876] transition-colors"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://twitter.com/YabuwatAtelier"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-[#b8a876] transition-colors"
              >
                <FaTwitter size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          {/* Bottom Footer */}
          <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
            <div className="text-center sm:text-left">
              <p className="text-sm text-gray-400">
                &copy; {new Date().getFullYear()} Premium Shop. All rights
                reserved.
              </p>
            </div>
            <div className="text-center sm:text-right">
              <p className="text-sm text-gray-400">
                Made with <span className="text-[#b8a876]">♥</span> for our
                customers
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
