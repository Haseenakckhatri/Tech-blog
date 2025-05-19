import CreatePostFormContainer from "@/components/blog/CreatePostFormContainer";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/server/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create New Post | Tech Reader Admin",
  description: "Create and publish a new blog post for Tech Reader",
  robots: "noindex, nofollow",
};

export default function CreatePostPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main>
        <section className="py-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Create New Post
              </h1>
              <p className="mt-2 text-gray-600">
                Fill out the form below to create and publish a new blog post.
                All posts will be immediately visible to readers after
                publication.
              </p>
            </div>
            {/* Form container that separates server and client components */}
            <CreatePostFormContainer />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
