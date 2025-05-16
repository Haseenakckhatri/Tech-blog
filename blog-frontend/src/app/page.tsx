import { fetchPosts } from "@/lib/api";
import { Post } from "@/types/post";
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
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-8">Tech Reader Blog</h1>

      <div className="space-y-6">
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map((post) => {
            if (!post || !post.attributes) {
              console.error("Invalid post data:", post);
              return null;
            }

            return (
              <Link
                key={post.id}
                href={`/blog/${post.attributes.slug}`}
                className="block border p-4 rounded hover:shadow-md transition"
              >
                <h2 className="text-2xl font-semibold">
                  {post.attributes.title}
                </h2>
                <p className="text-gray-500 text-sm">
                  By {post.attributes.author} —{" "}
                  {post.attributes.publishedDate
                    ? new Date(post.attributes.publishedDate).toDateString()
                    : new Date(post.attributes.publishedAt).toDateString()}
                </p>
                {post.attributes.content && (
                  <p className="text-gray-600 mt-2">
                    {post.attributes.content.slice(0, 150)}...
                  </p>
                )}
              </Link>
            );
          })
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No blog posts available right now.</p>
            <p className="text-gray-400 text-sm mt-2">
              Create your first post in the Strapi admin panel!
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
