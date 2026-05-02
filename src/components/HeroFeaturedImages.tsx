"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { ProductImage } from "@/generated/client";
import { AspectRatio } from "@/components/ui/aspect-ratio";

type HeroProduct = {
  id: number;
  name: string;
  images: ProductImage[];
};

type HeroFeaturedImagesProps = {
  products: HeroProduct[];
};

export function HeroFeaturedImages({ products }: HeroFeaturedImagesProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!products.length) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % products.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [products.length]);

  if (!products.length) {
    return null;
  }

  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg shadow-2xl">
      {products.map((product, index) => {
        const image = product.images[0];

        return (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className={`absolute inset-0 transition-opacity duration-1000 group ${
              index === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {image?.url ? (
               <AspectRatio ratio={1} className="overflow-hidden">
                 <Image
                   src={image.url}
                   alt={image.alt || product.name}
                   fill
                   className="object-cover group-hover:scale-105 transition-transform duration-300"
                 />
               </AspectRatio>
              
            ) : (
              <div className="h-full w-full bg-[#c5d5cf] flex items-center justify-center text-[#1a4d3e]">
                <span className="text-sm font-semibold">Featured product image</span>
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-[#1a4d3e]/90 via-[#1a4d3e]/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <p className="text-xs uppercase tracking-widest text-[#b8a876] mb-2 font-semibold">Featured</p>
              <h3 className="text-2xl sm:text-3xl font-semibold leading-tight">{product.name}</h3>
            </div>
          </Link>
        );
      })}

      <div className="absolute bottom-6 right-6 flex items-center gap-1.5">
        {products.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === activeIndex ? "bg-white w-8" : "bg-white/40 w-2 hover:bg-white/60"
            }`}
            aria-label={`Show slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
