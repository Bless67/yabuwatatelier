import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

function Loading() {
    return (
        <div className="min-h-screen bg-[#f5f1e8] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Skeleton */}
                <div className="text-center mb-12">
                    <Skeleton className="h-12 rounded-lg mb-3 max-w-md mx-auto" />
                    <Skeleton className="h-6 rounded-lg max-w-2xl mx-auto" />
                </div>

                {/* Products Grid Skeleton */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-12">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <Card key={i} className="shadow-none pt-0 overflow-hidden">
                            {/* Image Skeleton */}
                            <AspectRatio ratio={1}>
                                <Skeleton className="w-full h-full" />
                            </AspectRatio>

                            {/* Content Skeleton */}
                            <div className="p-2 sm:p-4 space-y-3">
                                {/* Name Skeleton */}
                                <Skeleton className="h-5 w-3/4 rounded" />

                                {/* Price Skeleton */}
                                <div className="flex gap-2">
                                    <Skeleton className="h-6 w-1/2 rounded" />
                                    <Skeleton className="h-5 w-1/4 rounded" />
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Loading;