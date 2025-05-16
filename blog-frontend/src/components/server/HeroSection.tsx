import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Tech Reader
          </h1>
          <p className="text-xl md:text-2xl opacity-90 mb-8 leading-relaxed">
            Discover the latest insights in technology, innovation, and digital transformation
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="#latest-articles"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-center"
            >
              Explore Latest
            </Link>
            <Link
              href="/newsletter"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors text-center"
            >
              Subscribe
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}