"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { getProductById } from "@/lib/actions/products";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import {
  FaArrowLeft,
  FaShieldAlt,
  FaTruck,
  FaUndoAlt,
  FaInfoCircle,
} from "react-icons/fa";
import { useEffect, useState, use } from "react";
import AddToCartButton from "@/components/AddToCartButton";
import ProductDetailsSkeleton from "@/components/ProductDetailsSkeleton";
import type { Product, ProductImage } from "@/generated/client";

type ProductWithImages = Product & {
  images: ProductImage[];
};

export default function ProductDetailsPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = use(params);
  const [product, setProduct] = useState<ProductWithImages | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(parseInt(productId));
        setProduct(data as ProductWithImages | null);
      } catch (error) {
        console.error("Error fetching product:", error);
        setFetchError(
          error instanceof Error
            ? error.message
            : "Unable to load product details at the moment",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <ProductDetailsSkeleton />;
  }

  if (fetchError || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f1e8] p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-[#1a4d3e] mb-4">
            {fetchError ? "Could not load product" : "Product not found"}
          </h2>
          {fetchError && <p className="text-gray-600 mb-6">{fetchError}</p>}
          <Link
            href="/catalog"
            className="inline-block px-6 py-3 rounded-lg bg-[#b8a876] text-[#1a4d3e] font-semibold hover:bg-[#1a4d3e] hover:text-white transition"
          >
            Back to Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <Link
          href="/catalog"
          className="flex items-center gap-2 text-[#1a4d3e] hover:text-[#b8a876] transition-colors font-semibold"
        >
          <FaArrowLeft size={18} />
          Back to Catalog
        </Link>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Carousel */}
          <div className="flex flex-col gap-6">
            <Carousel className="w-full">
              <CarouselContent>
                {product.images && product.images.length > 0 ? (
                  product.images.map((img) => (
                    <CarouselItem key={img.id}>
                      <div className="w-full h-full">
                        <AspectRatio
                          ratio={1}
                          className="bg-linear-to-br from-gray-100 to-gray-200"
                        >
                          <Image
                            src={img.url}
                            alt={img.alt || product.name}
                            fill
                            className="object-cover"
                            priority
                          />
                        </AspectRatio>
                      </div>
                    </CarouselItem>
                  ))
                ) : (
                  <CarouselItem>
                    <Card className="border-0 shadow-none">
                      <CardContent className="p-0">
                        <AspectRatio
                          ratio={1}
                          className="bg-linear-to-br from-gray-300 to-gray-400 flex items-center justify-center"
                        >
                          <span className="text-gray-600">No image available</span>
                        </AspectRatio>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                )}
              </CarouselContent>
              {product.images && product.images.length > 1 && (
                <>
                  <CarouselPrevious className="left-4 bg-white/80 hover:bg-white text-[#1a4d3e] border-0" />
                  <CarouselNext className="right-4 bg-white/80 hover:bg-white text-[#1a4d3e] border-0" />
                </>
              )}
            </Carousel>

            {/* Image Previews */}
            {product.images && product.images.length > 1 && (
              <div className="hidden lg:flex gap-3 justify-start overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={img.id}
                    className="shrink-0 w-20 h-20 border-3 border-gray-100 hover:border-[#b8a876] rounded-xl overflow-hidden transition-all duration-300 shadow-sm"
                  >
                    <Image
                      src={img.url}
                      alt={img.alt || `${product.name} ${idx + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold text-[#1a4d3e] leading-tight">
                {product.name}
              </h1>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f5f1e8] text-[#1a4d3e] text-sm font-medium">
                <FaInfoCircle size={14} />
                Item Reference: #{product.id}
              </div>
            </div>

            {/* Description */}
            <div className="bg-linear-to-r from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200">
              <h3 className="text-lg font-semibold text-[#1a4d3e] mb-3">
                Product Details
              </h3>
              <p className="text-gray-700 leading-relaxed text-base whitespace-pre-line">
                {product.description || "No description provided for this item."}
              </p>
            </div>

            {/* CTA Button */}
            <AddToCartButton productId={product.id} />

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <FaShieldAlt className="text-3xl text-[#b8a876] mx-auto mb-3" />
                <h3 className="font-bold text-[#1a4d3e] mb-1 text-center">
                  Quality
                </h3>
                <p className="text-gray-600 text-xs text-center">
                  Premium Selection
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <FaTruck className="text-3xl text-[#b8a876] mx-auto mb-3" />
                <h3 className="font-bold text-[#1a4d3e] mb-1 text-center">
                  Logistics
                </h3>
                <p className="text-gray-600 text-xs text-center">
                  Global Shipping
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <FaUndoAlt className="text-3xl text-[#b8a876] mx-auto mb-3" />
                <h3 className="font-bold text-[#1a4d3e] mb-1 text-center">
                  Support
                </h3>
                <p className="text-gray-600 text-xs text-center">
                  24/7 Assistance
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <FaInfoCircle className="text-3xl text-[#b8a876] mx-auto mb-3" />
                <h3 className="font-bold text-[#1a4d3e] mb-1 text-center">
                  Inquiry
                </h3>
                <p className="text-gray-600 text-xs text-center">
                  Quick Response
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}