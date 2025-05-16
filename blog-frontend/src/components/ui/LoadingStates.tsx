export function PostCardSkeleton() {
  return (
    <article className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-300"></div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-4 bg-gray-300 rounded-full w-20"></div>
          <div className="h-3 bg-gray-300 rounded w-2"></div>
          <div className="h-3 bg-gray-300 rounded w-24"></div>
        </div>
        <div className="h-6 bg-gray-300 rounded mb-2"></div>
        <div className="h-6 bg-gray-300 rounded mb-4 w-3/4"></div>
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <div className="h-4 bg-gray-300 rounded w-24"></div>
          </div>
          <div className="w-5 h-5 bg-gray-300 rounded"></div>
        </div>
      </div>
    </article>
  );
}

export function HeroSkeleton() {
  return (
    <section className="bg-gradient-to-r from-gray-300 to-gray-400 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="max-w-3xl">
          <div className="h-16 bg-white/20 rounded mb-6"></div>
          <div className="h-8 bg-white/20 rounded mb-8 w-3/4"></div>
          <div className="flex gap-4">
            <div className="h-12 bg-white/20 rounded w-32"></div>
            <div className="h-12 bg-white/20 rounded w-32"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function NavigationSkeleton() {
  return (
    <nav className="bg-white shadow-md h-16 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        <div className="h-8 bg-gray-300 rounded w-40"></div>
        <div className="hidden md:flex space-x-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-6 bg-gray-300 rounded w-20"></div>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gray-300 rounded-lg"></div>
          <div className="h-10 bg-gray-300 rounded w-24"></div>
        </div>
      </div>
    </nav>
  );
}

export function BlogDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      {/* Header */}
      <header className="bg-white">
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 mb-8">
            <div className="h-4 bg-gray-300 rounded w-16"></div>
            <div className="h-4 bg-gray-300 rounded w-4"></div>
            <div className="h-4 bg-gray-300 rounded w-16"></div>
          </div>

          {/* Meta Info */}
          <div className="flex items-center gap-2 mb-6">
            <div className="h-6 bg-gray-300 rounded w-24"></div>
            <div className="h-4 bg-gray-300 rounded w-2"></div>
            <div className="h-4 bg-gray-300 rounded w-32"></div>
          </div>

          {/* Title */}
          <div className="h-16 bg-gray-300 rounded mb-8"></div>
          <div className="h-16 bg-gray-300 rounded mb-8 w-4/5"></div>

          {/* Author */}
          <div className="flex items-center gap-4 pb-8 border-b border-gray-200">
            <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
            <div>
              <div className="h-5 bg-gray-300 rounded w-32 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-24"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Cover Image */}
      <div className="mb-12">
        <div className="max-w-5xl mx-auto">
          <div className="h-64 sm:h-96 lg:h-[500px] bg-gray-300 rounded-none sm:rounded-xl"></div>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4">
        <div className="space-y-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="space-y-3">
              <div className="h-5 bg-gray-300 rounded"></div>
              <div className="h-5 bg-gray-300 rounded w-11/12"></div>
              <div className="h-5 bg-gray-300 rounded w-5/6"></div>
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}

export function FeaturedTopicsSkeleton() {
  return (
    <section className="bg-white rounded-xl shadow-sm p-8 animate-pulse">
      <div className="h-8 bg-gray-300 rounded mb-6 w-48"></div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="bg-gray-100 p-4 rounded-lg">
            <div className="w-12 h-12 mx-auto mb-3 bg-gray-300 rounded-lg"></div>
            <div className="h-4 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function NewsletterSkeleton() {
  return (
    <section className="bg-gradient-to-r from-gray-300 to-gray-400 animate-pulse">
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="h-10 bg-white/20 rounded mb-4 w-64 mx-auto"></div>
        <div className="h-6 bg-white/20 rounded mb-8 w-96 mx-auto"></div>
        <div className="max-w-md mx-auto">
          <div className="flex gap-4">
            <div className="flex-1 h-12 bg-white/20 rounded-lg"></div>
            <div className="h-12 bg-white/20 rounded-lg w-32"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function LoadingSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-gray-300 border-t-blue-600`}
      ></div>
    </div>
  );
}

export function ErrorState({
  title = "Something went wrong",
  message = "An error occurred while loading the content.",
  onRetry,
}: {
  title?: string;
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="text-center max-w-md mx-auto px-4">
      <div className="w-24 h-24 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
        <svg
          className="w-12 h-12 text-red-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
      <p className="text-gray-600 mb-8">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

export function EmptyState({
  title = "No content found",
  message = "There's nothing to show here yet.",
  actionLabel,
  onAction,
}: {
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="text-center max-w-md mx-auto px-4">
      <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
        <svg
          className="w-12 h-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-500 mb-6">{message}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
