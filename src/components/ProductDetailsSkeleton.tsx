import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      {/* Back Button Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <Skeleton className="h-6 w-32" />
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Carousel Skeleton */}
          <div className="flex flex-col gap-6">
            <Skeleton className="w-full aspect-square rounded-lg" />
            <Skeleton className="h-12 w-24 rounded-full" />

            {/* Image Previews */}
            <div className="hidden lg:flex gap-3 justify-start overflow-x-auto pb-2">
              {[1, 2, 3].map((i) => (
                <Skeleton
                  key={i}
                  className="shrink-0 w-20 h-20 rounded-xl"
                />
              ))}
            </div>
          </div>

          {/* Product Info Skeleton */}
          <div className="flex flex-col justify-center space-y-8">
            {/* Title & Pricing Section */}
            <div className="space-y-4">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-10 w-1/3" />
            </div>

            {/* Description */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <Skeleton className="h-6 w-1/4 mb-4" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>

            {/* CTA Button */}
            <Skeleton className="h-14 w-full rounded-xl" />

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-20 rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
