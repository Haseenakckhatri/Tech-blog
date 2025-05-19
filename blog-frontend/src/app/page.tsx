import PostCard from "@/components/blog/PostCard";
import Navigation from "@/components/layout/Navigation";
import FeaturedTopics from "@/components/server/FeaturedTopics";
import Footer from "@/components/server/Footer";
import HeroSection from "@/components/server/HeroSection";
import { fetchPosts } from "@/lib/api";
import { Post } from "@/types/post";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tech Reader | Latest Technology Insights",
  description:
    "Discover the latest insights in technology, innovation, and digital transformation",
  openGraph: {
    title: "Tech Reader",
    description:
      "Your source for the latest technology insights and innovations",
    type: "website",
  },
  keywords: [
    "technology",
    "innovation",
    "AI",
    "blockchain",
    "web development",
    "data science",
  ],
  authors: [{ name: "Tech Reader Team" }],
};

export const revalidate = 3600;

export default async function HomePage() {
  let posts: Post[] = [];

  try {
    posts = await fetchPosts();
  } catch (error) {
    console.error("Error fetching posts:", error);
    posts = [];
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <Navigation />
      <HeroSection />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <section className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Latest Articles
            </h2>
            <Link
              href="/blog"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              View All →
            </Link>
          </div>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </section>

        <FeaturedTopics />
      </main>

      <Footer />
    </div>
  );
}

function EmptyState() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-12 text-center">
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
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253z"
          />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">No Posts Yet</h3>
      <p className="text-gray-500 mb-6">
        We&apos;re working on creating amazing content for you. Check back soon!
      </p>
      <Link
        href="/admin"
        className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Create First Post
      </Link>
    </div>
  );
}
