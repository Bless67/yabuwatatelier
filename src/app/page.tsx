import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaTruck, FaLock, FaHeadset, FaStar, FaGem } from "react-icons/fa";
import { getFeaturedProducts} from "@/lib/actions/products";
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { HeroFeaturedImages } from "@/components/HeroFeaturedImages";

export const metadata: Metadata = {
  title: "Yabuwat Atelier | Modern Nigerian Fashion",
  description:
    "Discover Yabuwat Atelier's premium Nigerian-inspired fashion, crafted for modern elegance and effortless everyday luxury.",
  keywords: [
    "Yabuwat Atelier",
    "Nigerian fashion",
    "modern apparel",
    "online boutique",
    "shop clothing",
    "fashion store",
  ],
  openGraph: {
    title: "Yabuwat Atelier | Modern Nigerian Fashion",
    description:
      "Discover Yabuwat Atelier's premium Nigerian-inspired fashion, crafted for modern elegance and effortless everyday luxury.",
    type: "website",
  },
};

export default async function HomePage() {
  const allProducts = await getFeaturedProducts();
  const featuredProducts = allProducts.slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-linear-to-r from-[#1a4d3e] to-[#2d5a52] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-40 h-40 sm:w-96 sm:h-96 bg-[#b8a876] rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-40 h-40 sm:w-96 sm:h-96 bg-[#c5d5cf] rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 leading-tight">
                  Yabuwat Atelier
                  <span className="block text-[#b8a876] mt-2">
                    Dress with intention
                  </span>
                </h1>
                <p className="text-base sm:text-lg text-[#c5d5cf] mb-6 sm:mb-8 line-clamp-3">
                  Born from a passion for culture, craftsmanship, and timeless
                  style, Yabuwat Atelier was created to redefine how people
                  express elegance. What began as a vision to elevate
                  traditional Nigerian fashion has evolved into a brand that
                  celebrates heritage through modern design.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link href="/about" className="w-full sm:w-auto">
                  <button className="w-full border-2 border-[#b8a876] text-[#b8a876] hover:bg-[#b8a876] hover:text-[#1a4d3e] font-bold text-base px-6 py-3 rounded-md">
                    Learn More
                  </button>
                </Link>
                <Link href="/catalog" className="w-full sm:w-auto">
                  <button className="w-full bg-[#b8a876] text-[#1a4d3e] hover:bg-white hover:text-[#b8a876] font-bold text-base px-6 py-3 rounded-md transform hover:scale-105 transition-all">
                    Shop Now
                  </button>
                </Link>
              </div>
            </div>

            <div className="relative h-64 sm:h-80 md:h-full">
              <div className="absolute inset-0 bg-linear-to-br from-[#b8a876]/20 to-transparent rounded-3xl" />
              <HeroFeaturedImages products={featuredProducts} />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 bg-[#f5f1e8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {[
              {
                icon: FaTruck,
                title: "Fast Delivery",
                desc: "Quick shipping to your doorstep",
              },
              {
                icon: FaLock,
                title: "Secure Payment",
                desc: "100% safe transactions",
              },
              {
                icon: FaHeadset,
                title: "24/7 Support",
                desc: "Always here to help",
              },
              {
                icon: FaStar,
                title: "Quality Assured",
                desc: "Premium products only",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-white p-4 sm:p-6 md:p-8 rounded-lg sm:rounded-xl text-center"
              >
                <feature.icon className="text-3xl sm:text-4xl text-[#b8a876] mx-auto mb-2 sm:mb-4" />
                <h3 className="font-bold text-[#1a4d3e] mb-1 sm:mb-2 text-sm sm:text-base md:text-lg">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-12 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a4d3e] mb-2 sm:mb-4">
                Featured Products
              </h2>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
                Check out our best sellers. Limited time offers available!
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-12">
              {featuredProducts.map((product) => (
                <Link key={product.id} href={`/product/${product.id}`}>
                  <Card className="group cursor-pointer shadow-none pt-0 overflow-hidden">
                    <AspectRatio ratio={1} className="bg-gray-100">
                      <div className="absolute inset-0 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
                      {product.images[0]?.url ? (
                        <Image
                          src={product.images[0].url}
                          alt={product.images[0].alt || product.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-300">
                          <span className="text-gray-500 text-xs">
                            No image
                          </span>
                        </div>
                      )}
                    </AspectRatio>

                    <div className="p-2 sm:p-4 flex flex-col justify-between">
                      <h3 className="font-bold text-[#1a4d3e] mb-1 sm:mb-2 line-clamp-2 group-hover:text-[#b8a876] text-xs sm:text-base">
                        {product.name}
                      </h3>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="text-center">
              <Link href="/catalog" className="inline-block w-full sm:w-auto">
                <button className="w-full sm:w-auto bg-[#b8a876] text-[#1a4d3e] hover:bg-[#1a4d3e] hover:text-[#b8a876] font-bold text-sm sm:text-base px-6 py-3 rounded-md transform hover:scale-105 transition-all">
                  View All Products
                </button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="py-12 sm:py-20 bg-[#f5f1e8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1a4d3e] mb-4 sm:mb-6">
                Why Choose Us?
              </h2>
              <div className="space-y-3 sm:space-y-4">
                {[
                  "Handpicked selection of premium products",
                  "Transparent pricing with no hidden charges",
                  "Fast and reliable shipping nationwide",
                  "Dedicated customer support team",
                  "Easy returns and exchanges",
                  "Regular discounts and exclusive offers",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 sm:gap-3">
                    <div className="text-[#b8a876] mt-1 text-lg sm:text-xl">
                      ✓
                    </div>
                    <p className="text-gray-700 text-sm sm:text-base">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-linear-to-br from-[#b8a876]/20 to-transparent p-6 sm:p-12 rounded-xl sm:rounded-2xl hidden sm:block">
              <div className="text-5xl sm:text-6xl text-center">
                <FaGem className="inline-block text-[#b8a876]" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}