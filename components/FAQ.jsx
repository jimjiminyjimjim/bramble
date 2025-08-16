import { Collapse } from "react-daisyui";
import { useTheme } from "@/helpers/theme";
import { cx } from "classix";

export const FAQ = ({ 
  title = "App Inquiries?", 
  subtitle = "Unlocking Answers: Your Guide to AI Mobile App Queries.",
  theme = "light", 
  anchor,
  expandable = true,
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

        <div className="mt-12 max-w-4xl mx-auto">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              expandable ? (
                <Collapse 
                  key={index} 
                  icon={"arrow"} 
                  className="border"
                  style={{ borderColor: `${colors.text.body}20` }}
                >
                  <Collapse.Title 
                    className="text-2xl font-medium"
                    style={{ color: colors.text.title }}
                  >
                    {faq.question}
                  </Collapse.Title>
                  <Collapse.Content>
                    <p 
                      className="text-lg"
                      style={{ color: colors.text.body }}
                    >
                      {faq.answer}
                    </p>
                  </Collapse.Content>
                </Collapse>
              ) : (
                <div 
                  key={index} 
                  className="border p-6 rounded-lg"
                  style={{ borderColor: `${colors.text.body}20` }}
                >
                  <h3 
                    className="text-2xl font-medium mb-4"
                    style={{ color: colors.text.title }}
                  >
                    {faq.question}
                  </h3>
                  <p 
                    className="text-lg"
                    style={{ color: colors.text.body }}
                  >
                    {faq.answer}
                  </p>
                </div>
              )
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
