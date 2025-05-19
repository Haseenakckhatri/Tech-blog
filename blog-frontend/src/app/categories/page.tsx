import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/server/Footer";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Categories | Tech Reader",
  description: "Browse articles by technology categories and topics",
  keywords: [
    "categories",
    "technology topics",
    "AI",
    "blockchain",
    "web development",
    "data science",
  ],
};

const categories = [
  {
    name: "AI & Machine Learning",
    slug: "ai-machine-learning",
    description:
      "Artificial Intelligence, Machine Learning, Deep Learning, and Neural Networks",
    postCount: 24,
    color: "bg-blue-100 text-blue-800",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    ),
  },
  {
    name: "Blockchain",
    slug: "blockchain",
    description:
      "Cryptocurrency, DeFi, Smart Contracts, and Distributed Ledger Technology",
    postCount: 18,
    color: "bg-green-100 text-green-800",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    ),
  },
  {
    name: "Web Development",
    slug: "web-development",
    description:
      "Frontend, Backend, Full-Stack Development, and Modern Frameworks",
    postCount: 32,
    color: "bg-purple-100 text-purple-800",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
      />
    ),
  },
  {
    name: "Data Science",
    slug: "data-science",
    description: "Big Data, Analytics, Statistics, and Data Visualization",
    postCount: 21,
    color: "bg-orange-100 text-orange-800",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v6a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    ),
  },
  {
    name: "Cloud Computing",
    slug: "cloud-computing",
    description: "AWS, Azure, Google Cloud, DevOps, and Infrastructure",
    postCount: 15,
    color: "bg-indigo-100 text-indigo-800",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 4h10a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V10a2 2 0 012-2z"
      />
    ),
  },
  {
    name: "Mobile Development",
    slug: "mobile-development",
    description: "iOS, Android, React Native, Flutter, and Mobile Apps",
    postCount: 19,
    color: "bg-pink-100 text-pink-800",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
      />
    ),
  },
];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Header */}
      <header className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Browse Categories
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our collection of technology articles organized by topic
              and expertise area
            </p>
          </div>
        </div>
      </header>

      {/* Categories Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 border border-gray-100 group"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <svg
                      className="w-6 h-6 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {category.icon}
                    </svg>
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h2>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${category.color}`}
                    >
                      {category.postCount} posts
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    {category.description}
                  </p>
                  <div className="flex items-center text-blue-600 group-hover:text-blue-700 transition-colors">
                    <span className="text-sm font-medium">
                      Explore category
                    </span>
                    <svg
                      className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-blue-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">
            Don&apos;t see your topic?
          </h2>
          <p className="text-lg opacity-90 mb-6">
            We&apos;re always expanding our content. Suggest a new category or
            topic you&apos;d like us to cover.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Suggest a Topic
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
