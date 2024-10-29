import MailchimpSingup from "@/components/MailchimpSignup";
import { anchorTags } from "@/helpers/anchorTags";

export const SignUp = ({ title, subtitle, anchor }) => {

  return (
    <section
      {...anchorTags(anchor)}
      data-anchor={anchor}
      className="flex flex-col items-center justify-center p-4 min-h-[500px] bg-base-content"
    >
      <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
        {title}
      </h1>
      <p className="text-lg md:text-xl mb-6 text-center text-gray-900 dark:text-white">
        {subtitle}
      </p>
      <MailchimpSingup />
    </section>
  );
};
