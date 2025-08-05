import { Collapse } from "react-daisyui";
import { useTheme } from "@/helpers/theme";
import { cx } from "classix";

export const FAQ = ({ 
  title = "App Inquiries?", 
  subtitle = "Unlocking Answers: Your Guide to AI Mobile App Queries.",
  theme = "light", 
  anchor, 
  faqs = [
    {
      question: "What is this product?",
      answer: "This is a comprehensive solution designed to help you achieve your goals efficiently and effectively."
    },
    {
      question: "How does it work?",
      answer: "Our product uses advanced technology to streamline your workflow and provide you with the tools you need to succeed."
    },
    {
      question: "Is there a free trial?",
      answer: "Yes, we offer a 14-day free trial so you can experience all the features before making a commitment."
    }
  ]
}) => {
  const colors = useTheme(theme);

  // Split FAQs into two columns for better layout
  const midpoint = Math.ceil(faqs.length / 2);
  const leftColumnFaqs = faqs.slice(0, midpoint);
  const rightColumnFaqs = faqs.slice(midpoint);

  return (
    <section 
      id={anchor}
      className="py-8 lg:py-24" 
      style={{ backgroundColor: colors.primary }}
    >
      <div className="container">
        <div className="text-center">
          <h2 
            className="text-4xl font-semibold"
            style={{ color: colors.text.title }}
          >
            {title}
          </h2>
          <p 
            className="mt-2 text-lg"
            style={{ color: colors.text.body }}
          >
            {subtitle}
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            {leftColumnFaqs.map((faq, index) => (
              <Collapse 
                key={index} 
                icon={"plus"} 
                className="border"
                style={{ borderColor: `${colors.text.body}20` }}
              >
                <Collapse.Title 
                  className="text-xl font-medium"
                  style={{ color: colors.text.title }}
                >
                  {faq.question}
                </Collapse.Title>
                <Collapse.Content>
                  <p 
                    className="text-base"
                    style={{ color: colors.text.body }}
                  >
                    {faq.answer}
                  </p>
                </Collapse.Content>
              </Collapse>
            ))}
          </div>

          <div className="space-y-6">
            {rightColumnFaqs.map((faq, index) => (
              <Collapse 
                key={index + leftColumnFaqs.length} 
                icon={"plus"} 
                className="border"
                style={{ borderColor: `${colors.text.body}20` }}
              >
                <Collapse.Title 
                  className="text-xl font-medium"
                  style={{ color: colors.text.title }}
                >
                  {faq.question}
                </Collapse.Title>
                <Collapse.Content>
                  <p 
                    className="text-base"
                    style={{ color: colors.text.body }}
                  >
                    {faq.answer}
                  </p>
                </Collapse.Content>
              </Collapse>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
