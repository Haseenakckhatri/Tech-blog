import Link from "next/link";

export default function FeaturedTopics() {
  const topics = [
    { name: "AI & Machine Learning", slug: "ai-machine-learning" },
    { name: "Blockchain", slug: "blockchain" },
    { name: "Web Development", slug: "web-development" },
    { name: "Data Science", slug: "data-science" },
  ];

  return (
    <section className="bg-white rounded-xl shadow-sm p-8 mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Topics</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {topics.map((topic) => (
          <Link
            key={topic.slug}
            href={`/category/${topic.slug}`}
            className="bg-gray-50 hover:bg-blue-50 p-4 rounded-lg transition-colors group"
          >
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 group-hover:bg-blue-200 rounded-lg flex items-center justify-center">
                <TopicIcon />
              </div>
              <p className="text-sm font-medium text-gray-700 group-hover:text-blue-700">
                {topic.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function TopicIcon() {
  return (
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
  );
}
