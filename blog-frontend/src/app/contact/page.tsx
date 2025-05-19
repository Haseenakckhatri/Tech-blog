import ContactFormContainer from "@/components/forms/ContactFormContainer";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/server/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Tech Reader",
  description:
    "Get in touch with the Tech Reader team. We'd love to hear from you about content ideas, partnerships, or general inquiries",
  keywords: ["contact", "tech reader", "inquiries", "support", "partnerships"],
  openGraph: {
    title: "Contact Tech Reader",
    description:
      "Reach out to the Tech Reader team with your questions and ideas.",
    url: "https://techreader.com/contact",
    siteName: "Tech Reader",
    type: "website",
  },
};

const contactInfo = [
  {
    title: "General Inquiries",
    email: "hello@techreader.com",
    description: "For general questions and feedback",
    icon: "📧",
  },
  {
    title: "Editorial",
    email: "editorial@techreader.com",
    description: "Content suggestions and guest posts",
    icon: "✍️",
  },
  {
    title: "Partnerships",
    email: "partnerships@techreader.com",
    description: "Business partnerships and collaborations",
    icon: "🤝",
  },
  {
    title: "Tech Support",
    email: "support@techreader.com",
    description: "Technical issues and bug reports",
    icon: "⚙️",
  },
];

const socialLinks = [
  {
    name: "Twitter",
    url: "https://twitter.com/techreader",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/company/techreader",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    url: "https://github.com/techreader",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl max-w-3xl mx-auto opacity-90">
              We&apos;d love to hear from you. Send us a message and we&apos;ll
              respond as soon as possible.
            </p>
          </div>
        </div>
      </header>

      {/* Contact Form & Info Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Send us a message
              </h2>
              <ContactFormContainer />
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Get in touch
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Choose the best way to reach us based on your needs.
              </p>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="text-3xl">{info.icon}</div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {info.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">
                          {info.description}
                        </p>
                        <a
                          href={`mailto:${info.email}`}
                          className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                        >
                          {info.email}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Address */}
              <div className="mt-8 bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Our Office
                </h3>
                <address className="text-gray-600 leading-relaxed not-italic">
                  123 Tech Street
                  <br />
                  Innovation District
                  <br />
                  San Francisco, CA 94105
                  <br />
                  United States
                </address>
              </div>

              {/* Response Time */}
              <div className="mt-6 bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                  Response Time
                </h3>
                <p className="text-blue-700">
                  We typically respond within 24 hours during business days
                  (Monday-Friday).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Follow Us</h2>
          <p className="text-lg text-gray-600 mb-8">
            Stay connected with us on social media for the latest updates
          </p>
          <div className="flex justify-center space-x-6">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-4 rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover:scale-110"
                aria-label={`Follow us on ${link.name}`}
              >
                <div className="text-gray-600 hover:text-blue-600 transition-colors">
                  {link.icon}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Can I contribute to Tech Reader?
                </h3>
                <p className="text-gray-600">
                  Yes! We welcome guest contributions. Please reach out to our
                  editorial team with your article ideas and credentials.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  How can I advertise on your site?
                </h3>
                <p className="text-gray-600">
                  For advertising opportunities, please contact our partnerships
                  team. We offer various advertising formats and packages.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Do you offer custom content creation?
                </h3>
                <p className="text-gray-600">
                  Yes, we provide custom content creation services for
                  businesses. Contact our editorial team to discuss your
                  requirements.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  How can I report a technical issue?
                </h3>
                <p className="text-gray-600">
                  Please use our technical support email or include detailed
                  information about the issue in the contact form above.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
