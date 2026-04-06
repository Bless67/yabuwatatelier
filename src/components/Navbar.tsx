"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiMenu,
  FiX,
  FiHome,
  FiShoppingBag,
  FiUsers,

} from "react-icons/fi";
import { useCart } from "@/context/CartProvider";
import { FaCartShopping } from "react-icons/fa6";
import { LuBadgeInfo } from "react-icons/lu";

import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { cartQuantity } = useCart();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#1a4d3e] shadow-2xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2">
          {/* Logo/Brand */}
          <div className="flex items-center rounded-lg p-2  ">
            <Link href="/">
              <Image src={"/logo.svg"} alt="logo" width={50} height={15} className="bg-[#d1d8b4]"/>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            <Link
              href="/"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 group ${
                pathname === "/"
                  ? "bg-[#b8a876] text-[#1a4d3e]"
                  : "text-white hover:bg-[#2d5a52] hover:text-[#b8a876]"
              }`}
            >
              <FiHome
                size={20}
                className="text-current group-hover:scale-110 transition-transform"
              />
              <span className="font-medium">Home</span>
            </Link>
            <Link
              href="/catalog"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 group ${
                pathname === "/catalog"
                  ? "bg-[#b8a876] text-[#1a4d3e]"
                  : "text-white hover:bg-[#2d5a52] hover:text-[#b8a876]"
              }`}
            >
              <FiShoppingBag
                size={20}
                className="text-current group-hover:scale-110 transition-transform"
              />
              <span className="font-medium">Catalog</span>
            </Link>
            <Link
              href="/contact"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 group ${
                pathname === "/contact"
                  ? "bg-[#b8a876] text-[#1a4d3e]"
                  : "text-white hover:bg-[#2d5a52] hover:text-[#b8a876]"
              }`}
            >
              <FiUsers
                size={20}
                className="text-current group-hover:scale-110 transition-transform"
              />
              <span className="font-medium">Contact</span>
            </Link>
            <Link
              href={"/cart"}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 group relative ${
                pathname === "/cart"
                  ? "bg-[#b8a876] text-[#1a4d3e]"
                  : "text-white hover:bg-[#2d5a52] hover:text-[#b8a876]"
              }`}
            >
              <div className="relative">
                <FaCartShopping size={20} className="text-current" />
                {cartQuantity > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartQuantity}
                  </span>
                )}
              </div>
              <span className="font-medium">Cart</span>
            </Link>
           
          </div>

          {/* Mobile Cart + Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {/* Mobile Cart Icon */}
            <Link
              href="/cart"
              className="relative p-2 rounded-lg hover:bg-[#2d5a52] transition-all duration-300"
            >
              <FaCartShopping size={20} className="text-white" />
              {cartQuantity > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartQuantity}
                </span>
              )}
            </Link>
            {/* Menu Button */}
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-3 rounded-lg hover:bg-[#2d5a52] focus:outline-none transition-all duration-300 hover:scale-110"
              aria-expanded={isOpen}
            >
              {isOpen ? <FiX size={28} className="text-white" /> : <FiMenu size={28} className="text-white" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <button
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            aria-label="Close menu"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative ml-auto h-full w-72 max-w-[85vw] bg-[#1a4d3e] text-[#E8E4D9] shadow-2xl animate-in slide-in-from-right-3 duration-300">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b8a876]">
                Menu
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center justify-center rounded-lg p-2 text-[#E8E4D9] hover:bg-[#2d5a52] transition-all duration-300"
                aria-label="Close menu"
              >
                <FiX size={22} />
              </button>
            </div>
            <div className="px-4 py-6 space-y-2">
              <Link
                href="/"
                className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 ${
                  pathname === "/"
                    ? "bg-[#b8a876] text-[#1a4d3e]"
                    : "hover:bg-[#2d5a52] text-[#E8E4D9] hover:text-[#b8a876]"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <FiHome size={20} />
                <span className="font-medium">Home</span>
              </Link>
              <Link
                href="/catalog"
                className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 ${
                  pathname === "/catalog"
                    ? "bg-[#b8a876] text-[#1a4d3e]"
                    : "hover:bg-[#2d5a52] text-[#E8E4D9] hover:text-[#b8a876]"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <FiShoppingBag size={20} />
                <span className="font-medium">Catalog</span>
              </Link>
              <Link
                href="/about"
                className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 ${
                  pathname === "/about"
                    ? "bg-[#b8a876] text-[#1a4d3e]"
                    : "hover:bg-[#2d5a52] text-[#E8E4D9] hover:text-[#b8a876]"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <LuBadgeInfo size={20} />
                <span className="font-medium">About</span>
              </Link>
              <Link
                href="/contact"
                className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 ${
                  pathname === "/contact"
                    ? "bg-[#b8a876] text-[#1a4d3e]"
                    : "hover:bg-[#2d5a52] text-[#E8E4D9] hover:text-[#b8a876]"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <FiUsers size={20} />
                <span className="font-medium">Contact</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
