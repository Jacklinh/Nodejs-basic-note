import { Skeleton } from "@/components/ui/skeleton"

export default function ProductDetailLoading() {
  return (
    <div className="container mx-auto py-8">
      {/* Breadcrumb loading */}
      <div className="mb-6 flex items-center gap-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-32" />
      </div>

      {/* Product detail section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left column - Image */}
        <div className="space-y-4">
          <Skeleton className="w-full aspect-square rounded-lg" /> {/* Main image */}
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, index) => (
              <Skeleton 
                key={`thumb-${index}`} 
                className="aspect-square rounded-lg"
              />
            ))}
          </div>
        </div>

        {/* Right column - Info */}
        <div className="space-y-6">
          <Skeleton className="h-8 w-3/4" /> {/* Product name */}
          
          <div className="space-y-2">
            <Skeleton className="h-6 w-32" /> {/* Unit */}
            <div className="flex items-center gap-4">
              <Skeleton className="h-8 w-40" /> {/* Price */}
              <Skeleton className="h-6 w-20" /> {/* Discount */}
            </div>
          </div>

          {/* Stock status */}
          <Skeleton className="h-6 w-24" />

          {/* Quantity selector */}
          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-32" /> {/* Quantity input */}
            <Skeleton className="h-12 w-40" /> {/* Add to cart button */}
          </div>

          {/* Description */}
          <div className="space-y-4">
            <Skeleton className="h-6 w-32" /> {/* Description title */}
            {[...Array(4)].map((_, index) => (
              <Skeleton 
                key={`desc-${index}`}
                className="h-4 w-full"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Related products section */}
      <div className="mt-12 space-y-6">
        <Skeleton className="h-8 w-48" /> {/* Section title */}
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[...Array(5)].map((_, index) => (
            <div key={`related-${index}`} className="space-y-4 p-4 border rounded-lg">
              <Skeleton className="w-full aspect-square rounded-lg" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-4 w-24" />
              <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-10 w-10 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}