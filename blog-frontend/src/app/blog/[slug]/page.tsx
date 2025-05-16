import { fetchPostBySlug } from "@/lib/api";
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
    const publishedDate = new Date(
      attributes.publishedDate || attributes.publishedAt
    ).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link
                  href="/"
                  className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
                >
                  Tech Reader
                </Link>
              </div>
              <div className="flex items-center">
                <Link
                  href="/"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  ← Back to Home
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Article Content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Cover Image */}
          {attributes.coverImage && attributes.coverImage.data && (
            <div className="mb-8">
              <Image
                src={`${
                  process.env.NEXT_PUBLIC_STRAPI_API_URL ||
                  "http://localhost:1337"
                }${attributes.coverImage.data.attributes.url}`}
                alt={
                  attributes.coverImage.data.attributes.alternativeText ||
                  attributes.title
                }
                width={800}
                height={400}
                className="w-full h-64 sm:h-96 object-cover rounded-lg shadow-lg"
                priority
              />
            </div>
          )}

          {/* Article Header */}
          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {attributes.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm">
              <span className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                    clipRule="evenodd"
                  />
                </svg>
                By {attributes.author}
              </span>

              <span className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
                {publishedDate}
              </span>
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
              {attributes.content}
            </div>
          </div>

          {/* Article Footer */}
          <footer className="mt-16 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Last updated:{" "}
                {new Date(attributes.updatedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>

              <Link
                href="/"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Read More Articles
              </Link>
            </div>
          </footer>
        </article>
      </div>
    );
  } catch (error) {
    console.error("Error loading blog post:", error);

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Something went wrong
          </h1>
          <p className="text-gray-600 mb-8">
            We couldnt load this blog post. Please try again later.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }
}
