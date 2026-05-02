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
    <nav className="bg-[#1a4d3e] shadow-lg sticky top-0 z-50 border-b border-[#0d2818]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link href="/">
              <Image src={"/logo.svg"} alt="logo" width={45} height={14} className="bg-[#d1d8b4] rounded-md"/>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-1">
            <Link
              href="/"
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-all duration-300 group ${
                pathname === "/"
                  ? "bg-[#b8a876] text-[#1a4d3e]"
                  : "text-white/80 hover:text-white hover:bg-[#2d5a52]"
              }`}
            >
              <FiHome
                size={18}
                className="text-current group-hover:scale-105 transition-transform"
              />
              <span className="font-medium">Home</span>
            </Link>
            <Link
              href="/catalog"
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-all duration-300 group ${
                pathname === "/catalog"
                  ? "bg-[#b8a876] text-[#1a4d3e]"
                  : "text-white/80 hover:text-white hover:bg-[#2d5a52]"
              }`}
            >
              <FiShoppingBag
                size={18}
                className="text-current group-hover:scale-105 transition-transform"
              />
              <span className="font-medium">Catalog</span>
            </Link>
            <Link
              href="/contact"
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-all duration-300 group ${
                pathname === "/contact"
                  ? "bg-[#b8a876] text-[#1a4d3e]"
                  : "text-white/80 hover:text-white hover:bg-[#2d5a52]"
              }`}
            >
              <FiUsers
                size={18}
                className="text-current group-hover:scale-105 transition-transform"
              />
              <span className="font-medium">Contact</span>
            </Link>
            <Link
              href={"/cart"}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-all duration-300 group relative ${
                pathname === "/cart"
                  ? "bg-[#b8a876] text-[#1a4d3e]"
                  : "text-white/80 hover:text-white hover:bg-[#2d5a52]"
              }`}
            >
              <div className="relative">
                <FaCartShopping size={18} className="text-current" />
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
          <div className="md:hidden flex items-center gap-1">
            {/* Mobile Cart Icon */}
            <Link
              href="/cart"
              className="relative p-2 rounded-md hover:bg-[#2d5a52] transition-all duration-300"
            >
              <FaCartShopping size={18} className="text-white" />
              {cartQuantity > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartQuantity}
                </span>
              )}
            </Link>
            {/* Menu Button */}
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-[#2d5a52] focus:outline-none transition-all duration-300 hover:scale-105"
              aria-expanded={isOpen}
            >
              {isOpen ? <FiX size={24} className="text-white" /> : <FiMenu size={24} className="text-white" />}
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
          <div className="relative ml-auto h-full w-64 max-w-[85vw] bg-[#1a4d3e] text-[#E8E4D9] shadow-2xl animate-in slide-in-from-right-3 duration-300 border-l border-[#0d2818]">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#b8a876]">
                Menu
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center justify-center rounded-md p-1.5 text-[#E8E4D9] hover:bg-[#2d5a52] transition-all duration-300"
                aria-label="Close menu"
              >
                <FiX size={20} />
              </button>
            </div>
            <div className="px-3 py-4 space-y-1">
              <Link
                href="/"
                className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-all duration-300 ${
                  pathname === "/"
                    ? "bg-[#b8a876] text-[#1a4d3e]"
                    : "hover:bg-[#2d5a52] text-[#E8E4D9] hover:text-[#b8a876]"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <FiHome size={18} />
                <span className="font-medium">Home</span>
              </Link>
              <Link
                href="/catalog"
                className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-all duration-300 ${
                  pathname === "/catalog"
                    ? "bg-[#b8a876] text-[#1a4d3e]"
                    : "hover:bg-[#2d5a52] text-[#E8E4D9] hover:text-[#b8a876]"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <FiShoppingBag size={18} />
                <span className="font-medium">Catalog</span>
              </Link>
              <Link
                href="/about"
                className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-all duration-300 ${
                  pathname === "/about"
                    ? "bg-[#b8a876] text-[#1a4d3e]"
                    : "hover:bg-[#2d5a52] text-[#E8E4D9] hover:text-[#b8a876]"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <LuBadgeInfo size={18} />
                <span className="font-medium">About</span>
              </Link>
              <Link
                href="/contact"
                className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-all duration-300 ${
                  pathname === "/contact"
                    ? "bg-[#b8a876] text-[#1a4d3e]"
                    : "hover:bg-[#2d5a52] text-[#E8E4D9] hover:text-[#b8a876]"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <FiUsers size={18} />
                <span className="font-medium">Contact</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
