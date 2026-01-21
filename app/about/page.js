import Link from "next/link";
import { BuilderSection } from "@/components/BuilderSection";

export const metadata = {
  title: "About Us - Bramble Club",
  description: "The story of Bramble Club - connecting experienced operators with founders seeking mentorship"
};

// Brand colors
const colors = {
  deepPurple: "#480099",
  mediumPurple: "#704BEC",
  coral: "#F37545",
  white: "#FFFFFF"
};

const teamMembers = [
  {
    name: "Kenny Ewan",
    image: "https://images.squarespace-cdn.com/content/v1/65679b8dcb8639629825c8fb/734f8327-ab0a-4e5f-ab36-ee5716c41853/3C4597C0-9273-4C5C-9120-9119C98B766D.jpeg",
    bio: "Former CEO and co-founder who led Wefarm to international success, connecting over 3.5 million users across the globe. A visionary leader with a rich background in start-ups, Kenny's expertise spans from early-stage funding strategies to scaling operations globally. His experience with VC relations and startup pitching makes him an invaluable mentor for founders navigating the complexities of growth and investment.",
    linkedin: "https://www.linkedin.com/in/kennyewan/"
  },
  {
    name: "Michelle Davies",
    image: "https://images.squarespace-cdn.com/content/v1/65679b8dcb8639629825c8fb/72b55240-e06b-4562-9ee2-82b95f4f7524/headshot.jpeg",
    bio: "Operational leader with a global perspective, Michelle has leveraged her strategic acumen to drive growth across diverse markets. At Wefarm, she scaled teams from 20 to over 300 members and expanded revenue to $12M annually. Her proficiency in operational strategy, team building, and market expansion positions her as a guiding force for startups aiming to scale effectively and sustainably.",
    linkedin: "https://www.linkedin.com/in/michelle-davies-14989220/"
  },
  {
    name: "David Fogel",
    image: "https://images.squarespace-cdn.com/content/v1/65679b8dcb8639629825c8fb/2887b1f0-2490-40ac-a617-b47da153cc8f/B26E4DE9-B924-4A24-A95A-21493836383E.jpeg",
    bio: "Seasoned VC and startup operator, David has spent 20 years working with and advising more than 1,000 founders on go-to-market strategy, fundraising, and scaling. He has supported startups that have collectively raised over $500M globally. David co-founded ADV, a £150M fund backing Europe's most ambitious founders, and brings deep expertise in venture capital, strategic growth, and founder mentorship.",
    linkedin: "https://www.linkedin.com/in/davefogel/"
  },
  {
    name: "Sofie Malá",
    image: "https://images.squarespace-cdn.com/content/v1/65679b8dcb8639629825c8fb/30066d52-82c7-4b2d-a4fa-368a3883a528/Untitled+design.png",
    bio: "Marketing and growth leader in startups, Sofie specialises in building high performing teams and creating scalable marketing engines. Her achievements include 70% CAC reductions and x3 network effects growth. Currently VP Growth at Yaga, she brings hands-on experience in growth strategy, performance marketing, and team leadership to help founders accelerate their growth trajectories.",
    linkedin: "https://www.linkedin.com/in/sofiemala/"
  }
];

export default async function AboutPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;

  return (
    <>
      <BuilderSection model="navbar" searchParams={resolvedSearchParams} />
      <main className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="relative">
        <div className="w-full h-[400px] md:h-[500px] relative">
          <img
            src="https://images.squarespace-cdn.com/content/v1/65679b8dcb8639629825c8fb/54cd49b3-caad-4439-b13f-b2786ff46b30/bramble+white+dots+%282%29.jpg"
            alt="Bramble Club Hero"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: `${colors.deepPurple}80` }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center px-4">
              The story of Bramble Club
            </h1>
          </div>
        </div>
      </section>

      {/* Origin Story Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg mx-auto text-gray-700">
            <p className="text-lg md:text-xl leading-relaxed">
              Our journey with Bramble began after a successful collaboration at Wefarm, where we scaled a global community of 3.5 million farmers, fostering knowledge sharing and growth. This experience taught us the incredible power of community-driven learning and peer-to-peer support.
            </p>
            <p className="text-lg md:text-xl leading-relaxed mt-6">
              After Wefarm, we found ourselves naturally drawn to mentoring founders who were navigating the challenging waters of building and scaling startups. What started as informal coffee chats and occasional advisory calls quickly evolved into something more structured as word spread and demand grew.
            </p>
            <p className="text-lg md:text-xl leading-relaxed mt-6">
              Within 18 months, we had built a dedicated community of founders and operators who were supporting each other through the ups and downs of startup life. We realised we had something special—a network of experienced operators genuinely invested in helping the next generation of founders succeed.
            </p>
          </div>
        </div>
      </section>

      {/* Why Bramble / Why Club Section */}
      <section
        className="py-16 md:py-24 px-4"
        style={{ backgroundColor: `${colors.mediumPurple}10` }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <div>
              <h2
                className="text-3xl md:text-4xl font-bold mb-6"
                style={{ color: colors.deepPurple }}
              >
                Why Bramble?
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Startups aren't smooth. Growth isn't linear. It's easy to get lost in the thorns and thickets of building a company. Like brambles in the wild, the path forward is often tangled and unpredictable. But within those brambles, there's sweetness to be found—the fruit of your labour, the wins that make it all worthwhile. We chose the name Bramble because it reflects the reality of the startup journey: challenging, sometimes painful, but ultimately rewarding for those who persist.
              </p>
            </div>
            <div>
              <h2
                className="text-3xl md:text-4xl font-bold mb-6"
                style={{ color: colors.deepPurple }}
              >
                Why Club?
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                We believe in the power of community. A club is more than just a network—it's a place of belonging, where members support each other and share in each other's successes and failures. Our aim is to connect experienced operators with founders who are seeking mentorship and guidance beyond their immediate networks. We wanted to create a space where founders could find not just advice, but genuine connection with people who've walked the path before them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-16"
            style={{ color: colors.deepPurple }}
          >
            Meet the Team
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div
                  className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden mb-6 ring-4"
                  style={{ ringColor: colors.mediumPurple }}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3
                  className="text-2xl font-bold mb-4"
                  style={{ color: colors.deepPurple }}
                >
                  {member.name}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {member.bio}
                </p>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium inline-flex items-center gap-2 transition-colors hover:opacity-80"
                  style={{ color: colors.mediumPurple }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-16 md:py-24 px-4 text-white"
        style={{ backgroundColor: colors.deepPurple }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Got growing pains?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Book a free intro call
          </p>
          <a
            href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0P7GARJ2Y6X3Gj_CPkQbcsLH_IhpxXQcV6HGJ9VJHHdPxPqXEJhNqgT8z5s_nBJHfZcZLB0eBe"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105"
            style={{ backgroundColor: colors.coral, color: colors.white }}
          >
            Book a call
          </a>
        </div>
      </section>

      {/* Mailing List Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: colors.deepPurple }}
          >
            Mailing List
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Sign up for the latest Bramble Club content & updates
          </p>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ "--tw-ring-color": colors.mediumPurple }}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ "--tw-ring-color": colors.mediumPurple }}
              />
            </div>
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
              style={{ "--tw-ring-color": colors.mediumPurple }}
            />
            <button
              type="submit"
              className="w-full text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:opacity-90"
              style={{ backgroundColor: colors.deepPurple }}
            >
              Sign Up
            </button>
          </form>
        </div>
      </section>

    </main>
      <BuilderSection model="footer" searchParams={resolvedSearchParams} />
    </>
  );
}
