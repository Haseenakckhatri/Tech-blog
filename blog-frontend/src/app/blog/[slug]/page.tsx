import Navigation from "@/components/layout/Navigation";
import { fetchPostBySlug } from "@/lib/api";
import { formatDate, getReadingTime } from "@/lib/utils";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface BlogPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  try {
    const post = await fetchPostBySlug(params.slug);

    if (!post) {
      return {
        title: "Post Not Found | Tech Reader",
        description: "The requested blog post could not be found.",
      };
    }

    return {
      title: `${post.attributes.title} | Tech Reader`,
      description: post.attributes.content.slice(0, 160) + "...",
      authors: [{ name: post.attributes.author }],
      openGraph: {
        title: post.attributes.title,
        description: post.attributes.content.slice(0, 160) + "...",
        type: "article",
        publishedTime:
          post.attributes.publishedDate || post.attributes.publishedAt,
        images: post.attributes.coverImage?.data
          ? [
              {
                url: `${
                  process.env.NEXT_PUBLIC_STRAPI_API_URL ||
                  "http://localhost:1337"
                }${post.attributes.coverImage.data.attributes.url}`,
                width: post.attributes.coverImage.data.attributes.width,
                height: post.attributes.coverImage.data.attributes.height,
                alt:
                  post.attributes.coverImage.data.attributes.alternativeText ||
                  post.attributes.title,
              },
            ]
          : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: post.attributes.title,
        description: post.attributes.content.slice(0, 200) + "...",
        images: post.attributes.coverImage?.data
          ? [
              `${
                process.env.NEXT_PUBLIC_STRAPI_API_URL ||
                "http://localhost:1337"
              }${post.attributes.coverImage.data.attributes.url}`,
            ]
          : undefined,
      },
    };
  } catch {
    return {
      title: "Error | Tech Reader",
      description: "An error occurred while loading the blog post.",
    };
  }
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
  try {
    const post = await fetchPostBySlug(params.slug);

    if (!post) {
      notFound();
    }

    const { attributes } = post;
    const publishedDate = formatDate(
      attributes.publishedDate || attributes.publishedAt
    );
    const readingTime = getReadingTime(attributes.content);

    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />

        {/* Header Section */}
        <header className="bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <ol className="flex items-center space-x-2 text-sm text-gray-500">
                <li>
                  <Link
                    href="/"
                    className="hover:text-blue-600 transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-4 h-4 mx-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Blog
                </li>
                <li className="flex items-center text-gray-900">
                  <svg
                    className="w-4 h-4 mx-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Article
                </li>
              </ol>
            </nav>

            {/* Article Meta */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-medium">
                  Technology
                </span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600 text-sm">{publishedDate}</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600 text-sm">
                  {readingTime} min read
                </span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
              {attributes.title}
            </h1>

            {/* Author */}
            <div className="flex items-center gap-4 pb-8 border-b border-gray-200">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-lg font-bold">
                  {attributes.author.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">
                  {attributes.author}
                </p>
                <p className="text-gray-600 text-sm">Technology Writer</p>
              </div>
            </div>
          </div>
        </header>

        {/* Cover Image */}
        {attributes.coverImage && attributes.coverImage.data && (
          <div className="mb-12">
            <div className="max-w-5xl mx-auto">
              <div className="relative w-full h-64 sm:h-96 lg:h-[500px] overflow-hidden rounded-none sm:rounded-xl">
                <Image
                  src={`${
                    process.env.NEXT_PUBLIC_STRAPI_API_URL ||
                    "http://localhost:1337"
                  }${attributes.coverImage.data.attributes.url}`}
                  alt={
                    attributes.coverImage.data.attributes.alternativeText ||
                    attributes.title
                  }
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
          </div>
        )}

        {/* Article Content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-700 leading-relaxed space-y-6 text-lg">
              {/* Split content into paragraphs */}
              {attributes.content.split("\n").map((paragraph, index) => {
                if (paragraph.trim() === "") return null;
                return (
                  <p key={index} className="mb-6">
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </div>

          {/* Article Actions */}
          <div className="mt-12 py-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="text-gray-600 text-sm">
                  Share this article:
                </span>
                <div className="flex gap-2">
                  <SocialShareButton
                    platform="twitter"
                    url={`/blog/${params.slug}`}
                    title={attributes.title}
                  />
                  <SocialShareButton
                    platform="linkedin"
                    url={`/blog/${params.slug}`}
                    title={attributes.title}
                  />
                  <SocialShareButton
                    platform="facebook"
                    url={`/blog/${params.slug}`}
                    title={attributes.title}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
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
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
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
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Article Footer */}
          <footer className="mt-16 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-sm text-gray-500">
                <p>Last updated: {formatDate(attributes.updatedAt)}</p>
              </div>

              <div className="flex gap-4">
                <Link
                  href="/"
                  className="inline-flex items-center px-6 py-3 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  ← Back to Home
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  Read More Articles
                </Link>
              </div>
            </div>
          </footer>
        </article>

        {/* Newsletter Subscription */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white mt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h2 className="text-3xl font-bold mb-4">Stay in the loop</h2>
            <p className="text-xl opacity-90 mb-8">
              Get the latest technology insights delivered to your inbox weekly
            </p>
            <div className="max-w-md mx-auto">
              <div className="flex gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
                />
                <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap">
                  Subscribe
                </button>
              </div>
              <p className="text-sm opacity-75 mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Tech Reader</h3>
                <p className="text-gray-400 mb-4">
                  Your source for the latest technology insights and
                  innovations.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Categories</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <Link
                      href="#"
                      className="hover:text-white transition-colors"
                    >
                      AI & ML
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-white transition-colors"
                    >
                      Blockchain
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-white transition-colors"
                    >
                      Web Development
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-white transition-colors"
                    >
                      Data Science
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <Link
                      href="#"
                      className="hover:text-white transition-colors"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-white transition-colors"
                    >
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-white transition-colors"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-white transition-colors"
                    >
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Connect</h4>
                <p className="text-gray-400 mb-4">Follow us for updates</p>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <Link
                      href="#"
                      className="hover:text-white transition-colors"
                    >
                      Twitter
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-white transition-colors"
                    >
                      LinkedIn
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-white transition-colors"
                    >
                      Facebook
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2025 Tech Reader. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    );
  } catch (error) {
    console.error("Error loading blog post:", error);

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
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
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Something went wrong
          </h1>
          <p className="text-gray-600 mb-8">
            We couldn&apos;t load this blog post. Please try again later.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Return to Home
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function SocialShareButton({
  platform,
  url,
  title,
}: {
  platform: "twitter" | "linkedin" | "facebook";
  url: string;
  title: string;
}) {
  const getShareUrl = () => {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    const fullUrl = `${baseUrl}${url}`;

    switch (platform) {
      case "twitter":
        return `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          fullUrl
        )}&text=${encodeURIComponent(title)}`;
      case "linkedin":
        return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          fullUrl
        )}`;
      case "facebook":
        return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          fullUrl
        )}`;
      default:
        return "#";
    }
  };

  const icons = {
    twitter: (
      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
    ),
    linkedin: (
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    ),
    facebook: (
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    ),
  };

  return (
    <a
      href={getShareUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
      aria-label={`Share on ${platform}`}
    >
      <svg
        className="w-5 h-5 text-gray-600"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        {icons[platform]}
      </svg>
    </a>
  );
}
