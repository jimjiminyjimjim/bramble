import { useState } from "react";
import { Button, Input, Join } from "react-daisyui";

export default function MailchimpSignup() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("EMAIL", email);

    fetch(
      "https://nesta.us10.list-manage.com/subscribe/post?u=5a8da10efa8a04b3230047443&amp;id=1272704176&amp;f_id=006a91e3f0",
      {
        method: "POST",
        body: form,
        mode: "no-cors", // Avoid CORS issues since Mailchimp form doesn't support it
      }
    )
      .then(() => {
        setIsSubmitted(true);
      })
      .catch((error) => {
        console.error("Error submitting form", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Join className="join inline-flex">
        <Input
          autoComplete="email"
          id="email"
          className="input join-item input-bordered w-full lg:max-w-xs"
          placeholder="email@ai.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit" color={"ghost"} className="join-item bg-white/5">
          {isSubmitted ? "Submitted" : "Submit"}
        </Button>
      </Join>
    </form>
  );
}
