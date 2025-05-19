import { Post } from "@/types/post";
import Image from "next/image";
import Link from "next/link";

interface PostCardProps {
  post: Post;
}

function formatDate(date: string | Date): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

export default function PostCard({ post }: PostCardProps) {
  if (!post?.attributes) return null;

  const { attributes } = post;
  const publishedDate = formatDate(
    attributes.publishedDate || attributes.publishedAt
  );
  const readingTime = getReadingTime(attributes.content);
  //   const excerpt = attributes.content.slice(0, 150);

  return (
    <article className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
      <Link href={`/blog/${attributes.slug}`}>
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          {attributes.coverImage?.data ? (
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
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
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
            <span className="text-gray-500 text-xs">{publishedDate}</span>
            <span className="text-gray-400 text-xs">•</span>
            <span className="text-gray-500 text-xs">
              {readingTime} min read
            </span>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {attributes.title}
          </h2>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">
                  {attributes.author.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="text-gray-700 text-sm font-medium">
                {attributes.author}
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
}
