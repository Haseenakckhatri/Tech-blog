import { fetchPosts } from "@/lib/api";
import { Post } from "@/types/post";
import Image from "next/image";
import Link from "next/link";

export default async function HomePage() {
  let posts: Post[] = [];

  try {
    posts = await fetchPosts();
    console.log("Fetched posts:", posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    posts = [];
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Tech Reader
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8 leading-relaxed">
              Discover the latest insights in technology, innovation, and
              digital transformation
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Explore Latest
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                Tech Reader
              </Link>
              <div className="hidden md:flex space-x-6">
                <Link
                  href="/"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/categories"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Categories
                </Link>
                <Link
                  href="/about"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  About
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <section className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Latest Articles
            </h2>
            <Link
              href="/archive"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              View All →
            </Link>
          </div>

          {Array.isArray(posts) && posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => {
                if (!post || !post.attributes) {
                  console.error("Invalid post data:", post);
                  return null;
                }

                const publishedDate = post.attributes.publishedDate
                  ? new Date(post.attributes.publishedDate).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )
                  : new Date(post.attributes.publishedAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    );

                return (
                  <article
                    key={post.id}
                    className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
                  >
                    <Link href={`/blog/${post.attributes.slug}`}>
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        {post.attributes.coverImage?.data ? (
                          <Image
                            src={`${
                              process.env.NEXT_PUBLIC_STRAPI_API_URL ||
                              "http://localhost:1337"
                            }${post.attributes.coverImage.data.attributes.url}`}
                            alt={
                              post.attributes.coverImage.data.attributes
                                .alternativeText || post.attributes.title
                            }
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                            <svg
                              className="w-12 h-12 text-white opacity-70"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                            Technology
                          </span>
                          <span className="text-gray-400 text-xs">•</span>
                          <span className="text-gray-500 text-xs">
                            {publishedDate}
                          </span>
                        </div>

                        <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {post.attributes.title}
                        </h2>

                        {post.attributes.content && (
                          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                            {post.attributes.content.slice(0, 150)}...
                          </p>
                        )}

                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-bold">
                                {post.attributes.author.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <span className="text-gray-700 text-sm font-medium">
                              {post.attributes.author}
                            </span>
                          </div>
                          <svg
                            className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors"
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
                    </Link>
                  </article>
                );
              })}
            </div>
          ) : (
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
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Posts Yet
              </h3>
              <p className="text-gray-500 mb-6">
                We&apos;re working on creating amazing content for you. Check
                back soon!
              </p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Create First Post
              </button>
            </div>
          )}
        </section>

        {/* Featured Section */}
        <section className="bg-white rounded-xl shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Featured Topics
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "AI & Machine Learning",
              "Blockchain",
              "Web Development",
              "Data Science",
            ].map((topic) => (
              <Link
                key={topic}
                href={`/category/${topic.toLowerCase().replace(/\s+/g, "-")}`}
                className="bg-gray-50 hover:bg-blue-50 p-4 rounded-lg transition-colors group"
              >
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 group-hover:bg-blue-200 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-700 group-hover:text-blue-700">
                    {topic}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Tech Reader</h3>
              <p className="text-gray-400 mb-4">
                Your source for the latest technology insights and innovations.
              </p>
              <div className="flex space-x-4">
                <button className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    AI & ML
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Blockchain
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Development
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Subscribe</h4>
              <p className="text-gray-400 mb-4">Get the latest updates</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-gray-800 text-white px-4 py-2 rounded-l-lg flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-lg transition-colors">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Tech Reader. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
