import { BuilderSection } from "@/components/BuilderSection";

export const metadata = {
  title: "Contact Us - Bramble Club",
  description: "Get in touch with Bramble Club - we'd love to hear from you"
};

// Brand colors
const colors = {
  deepPurple: "#480099",
  mediumPurple: "#704BEC",
  coral: "#F37545",
  white: "#FFFFFF"
};

export default async function ContactPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;

  return (
    <>
      <BuilderSection model="navbar" searchParams={resolvedSearchParams} />
      <main className="min-h-screen bg-white flex flex-col lg:flex-row">
      {/* Left Side - Image */}
      <div className="lg:w-1/2 h-[300px] lg:h-auto lg:min-h-screen relative">
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
          alt="Team collaboration"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0 flex items-center justify-center p-8"
          style={{ backgroundColor: `${colors.deepPurple}70` }}
        >
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Let's Talk
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              We'd love to hear from you
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Contact Form */}
      <div className="lg:w-1/2 flex items-center justify-center p-8 md:p-12 lg:p-16">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2
              className="text-3xl md:text-4xl font-bold mb-3"
              style={{ color: colors.deepPurple }}
            >
              Get in Touch
            </h2>
            <p className="text-gray-600 text-lg">
              Have a question or want to work together? Drop us a message.
            </p>
          </div>

          <form
            name="contact"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            className="space-y-5"
          >
            {/* Hidden field for Netlify */}
            <input type="hidden" name="form-name" value="contact" />

            {/* Honeypot field for spam protection */}
            <p className="hidden">
              <label>
                Don't fill this out: <input name="bot-field" />
              </label>
            </p>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                style={{ "--tw-ring-color": colors.mediumPurple }}
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                style={{ "--tw-ring-color": colors.mediumPurple }}
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                style={{ "--tw-ring-color": colors.mediumPurple }}
                placeholder="What's this about?"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all resize-none"
                style={{ "--tw-ring-color": colors.mediumPurple }}
                placeholder="Tell us more..."
              />
            </div>

            <button
              type="submit"
              className="w-full text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:opacity-90 hover:scale-[1.02]"
              style={{ backgroundColor: colors.deepPurple }}
            >
              Send Message
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-gray-600 text-sm">
              Or email us directly at{" "}
              <a
                href="mailto:info@bramble.club"
                className="font-medium hover:opacity-80 transition-opacity"
                style={{ color: colors.mediumPurple }}
              >
                info@bramble.club
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
      <BuilderSection model="footer" searchParams={resolvedSearchParams} />
    </>
  );
}
