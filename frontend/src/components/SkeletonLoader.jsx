/**
 * Skeleton loaders for loading states
 */

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-6 lg:p-8 animate-pulse">
      <div className="flex justify-between items-start mb-6">
        <div className="h-6 bg-gray-200 rounded w-2/3"></div>
        <div className="h-8 bg-gray-200 rounded-full w-24"></div>
      </div>
      
      <div className="space-y-3 mb-6">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="h-4 bg-gray-100 rounded w-20"></div>
        <div className="h-6 bg-gray-200 rounded w-32"></div>
        <div className="h-4 bg-gray-100 rounded w-20"></div>
        <div className="h-6 bg-gray-200 rounded w-40"></div>
      </div>

      <div className="pt-6 border-t flex justify-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full"></div>
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 3 }) {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-4 lg:p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {Array.from({ length: count }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}

export function SkeletonDetailHeader() {
  return (
    <div className="mb-8 animate-pulse">
      <div className="h-10 bg-gray-200 rounded-lg w-32 mb-6"></div>
      <div className="mb-4">
        <div className="h-10 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-6 bg-gray-100 rounded w-full"></div>
      </div>
    </div>
  );
}

export function SkeletonCardContent() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-40 mb-6"></div>
      <div className="space-y-4">
        <div className="h-4 bg-gray-100 rounded w-full"></div>
        <div className="h-4 bg-gray-100 rounded w-5/6"></div>
        <div className="h-4 bg-gray-100 rounded w-4/6"></div>
      </div>
    </div>
  );
}

export function SkeletonChecklistSection() {
  return (
    <div className="border-2 border-gray-200 rounded-lg overflow-hidden shadow-sm animate-pulse">
      <div className="w-full px-8 py-5 bg-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <div className="w-5 h-5 bg-gray-300 rounded"></div>
          <div className="h-6 bg-gray-300 rounded w-40"></div>
          <div className="h-6 bg-gray-300 rounded-full w-20 ml-auto"></div>
        </div>
      </div>
      <div className="px-8 py-6 bg-white space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-start space-x-3 p-4 rounded-lg">
            <div className="w-6 h-6 bg-gray-200 rounded mt-1 flex-shrink-0"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-100 rounded w-full"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
