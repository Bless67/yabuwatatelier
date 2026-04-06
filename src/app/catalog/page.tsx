import type { Metadata } from "next";
import Image from "next/image";
import { getProducts} from "@/lib/actions/products";
import Link from "next/link";
import { BsBoxSeam } from "react-icons/bs";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import AddToCartButton from "@/components/AddToCartButton";

export const metadata: Metadata = {
  title: "Catalog | Yabuwat Atelier Collection",
  description:
    "Browse Yabuwat Atelier's full collection of premium pieces, curated for elegant everyday style.",
  openGraph: {
    title: "Catalog | Yabuwat Atelier Collection",
    description:
      "Browse Yabuwat Atelier's full collection of premium pieces, curated for elegant everyday style.",
    type: "website",
  },
};

async function CatalogPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-linear-to-b from-[#f5f1e8] to-[#ede8dd]">
      {/* Header Section */}
      <div className="bg-linear-to-r from-[#1a4d3e] to-[#2d5a52] text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xs sm:text-sm uppercase tracking-widest text-[#b8a876] font-medium mb-3">
            New Season · {new Date().getFullYear()} just arrived
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 tracking-tight">
            Premium Collection
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#c5d5cf] max-w-2xl mx-auto">
            Discover our handpicked selection of quality products, crafted for
            your lifestyle
          </p>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Filter Bar */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-gray-600 text-sm">
            Showing{" "}
            <span className="font-semibold text-[#1a4d3e]">
              {products.length}
            </span>{" "}
            products
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {products.map((product) => {
            return (
              <Card
                key={product.id}
                className="group cursor-pointer shadow-none pt-0 overflow-hidden hover:shadow-md transition-shadow duration-300"
              >
                {/* Image */}
                <Link href={`/product/${product.id}`}>
                  <AspectRatio ratio={1} className="bg-gray-100 relative overflow-hidden">
                    {/* shimmer placeholder */}
                    <div className="absolute inset-0 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />

                    {product.images[0]?.url ? (
                      <Image
                        src={product.images[0].url}
                        alt={product.images[0].alt || product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500 relative z-10"
                        priority={false}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-300 relative z-10">
                        <span className="text-gray-500 text-xs">No image</span>
                      </div>
                    )}


                  </AspectRatio>
                </Link>

                {/* Content */}
                <CardContent className="pt-3 pb-4 px-3">
                  {/* Name + Add to Cart side by side */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Link href={`/product/${product.id}`} className="flex-1 min-w-0">
                      <CardTitle className="text-xs sm:text-sm line-clamp-2 group-hover:text-[#b8a876] transition-colors leading-snug">
                        {product.name}
                      </CardTitle>
                    </Link>

                    <div className="shrink-0">
                      <AddToCartButton
                        productId={product.id}
                        variant="compact"
                      />
                    </div>
                  </div>

                  {/* Short description */}
                  {product.description && (
                    <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed mb-2">
                      {product.description}
                    </p>
                  )}


                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center py-20">
            <div className="flex items-center justify-center text-6xl text-[#1a4d3e]/30 mb-4">
                <BsBoxSeam />
              </div>
            <h2 className="text-3xl font-bold text-[#1a4d3e] mb-2">
              No Products Available
            </h2>
            <p className="text-gray-600 text-lg">
              Check back soon for our amazing collection!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CatalogPage;