import { fetchOneEntry, subscribeToEditor } from "@builder.io/sdk-react";
import { useEffect, useState, useRef, useContext } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { AiFillCloseCircle } from "react-icons/ai";
import { DynamicIcon } from "@/components/Icon";
import { useTheme } from "@/helpers/theme";
import { sendGTMEvent } from '@next/third-parties/google';

// Mailchimp Subscription Form for Popup
const MailchimpPopupForm = ({ 
  onFormSubmit, 
  mailchimpTags, 
  includeNameField = false,
  placeholder = "Enter your email",
  namePlaceholder = "Enter your name"
}) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pageTitle, setPageTitle] = useState("");

  const searchParams = useSearchParams();
  const pathName = usePathname();

  useEffect(() => {
    setPageTitle(document?.title?.split("-")[0].trim() || "");
  }, []);

  const initialSource = searchParams.get("utm_source") || "";
  const initialMedium = searchParams.get("utm_medium") || "";
  const initialCampaign = searchParams.get("utm_campaign") || "";
  const campaignContent = searchParams.get("utm_content") || "";
  const campaignTerms = searchParams.get("utm_term") || "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (honeypot) {
      // If the honeypot is filled, silently fail (bot detected)
      onFormSubmit("success");
      setEmail("");
      setName("");
      return;
    }

    if (!email.includes("@")) {
      onFormSubmit("error");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          ...(includeNameField && name && { name }),
          tags: [
            ...(pageTitle ? [pageTitle] : []),
            ...(mailchimpTags?.split(",").map((tag) => tag.trim()) || []),
            `path:${pathName || "/"}`
          ],
          utm_source: initialSource,
          utm_medium: initialMedium,
          utm_campaign: initialCampaign,
          utm_content: campaignContent,
          utm_term: campaignTerms
        })
      });

      if (!response.ok) throw new Error("Failed to subscribe");

      onFormSubmit("success");
      setEmail("");
      setName("");

      sendGTMEvent({
        event: "popupFormSubmit",
        value: {
          source: initialSource,
          medium: initialMedium,
          campaign: initialCampaign
        }
      });
    } catch (err) {
      console.error(err);
      onFormSubmit("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot field - hidden from users */}
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        style={{ display: "none" }}
        tabIndex="-1"
        autoComplete="off"
      />
      
      {includeNameField && (
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={namePlaceholder}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}
      
      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? "Subscribing..." : "Subscribe"}
      </button>
    </form>
  );
};

// Legacy Mailchimp Form (keeping for backward compatibility)
const MailchimpFormEmbed = ({ embedHtml, siteData, onFormSubmit }) => {
  const formRef = useRef(null);

  useEffect(() => {
    // Find the form inside the rendered HTML
    const form = formRef.current?.querySelector("form");

    if (form) {
      // Intercept form submission
      const handleFormSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission

        const formData = new FormData(form); // Collect form data

        // Send the form data programmatically via fetch
        fetch(form.action, {
          method: form.method,
          body: formData,
          mode: "no-cors",
        })
          .then(() => {
            console.log("Form successfully submitted 2");
            sendGTMEvent({ event: 'popupFormSubmit' })
            sendGTMEvent({ event: 'popupFormSubmit2' })
            onFormSubmit("success");
          })
          .catch((error) => {
            console.error("Form submission error:", error);
            onFormSubmit("error");
          });
      };

      // Attach the custom submit handler to the form
      form.addEventListener("submit", handleFormSubmit);

      // Cleanup the event listener when the component is unmounted
      return () => form.removeEventListener("submit", handleFormSubmit);
    }
  }, [embedHtml, onFormSubmit]);

  return <div ref={formRef} dangerouslySetInnerHTML={{ __html: embedHtml }} />;
};

function toCamelCase(text) {
  return text
    .toLowerCase() // Convert the text to lowercase
    .replace(/[^a-z0-9]+(.)/g, (match, char) => char.toUpperCase()); // Remove non-alphanumeric chars and capitalize following letters
}

export function Popup({
  children,
  formCode,
  siteData,
  ctaText,
  theme,
  textLink,
  buttonColor = "#3B82F6",
  icon = "",
  iconPosition = "left",
  useMailchimpAPI = true,
  includeNameField = false,
  mailchimpTags = "",
  placeholder = "Enter your email",
  namePlaceholder = "Enter your name"
}) {
  const colors = useTheme(theme);
  const [content, setContent] = useState(null);
  const [formStatus, setFormStatus] = useState(null);

  const handleFormSubmit = (status) => {
    setFormStatus(status);
    if (status === "success") {
      setTimeout(() => {
        document.getElementById("my_modal_3").close();
        setFormStatus(null);
      }, 2000);
    }
  };
  
  useEffect(() => {
    setContent(true);
  }, []);

  const closeModal = () => {
    const modal = document.getElementById("my_modal_3");
    modal.close();
  };

  if (!content) return null;

  return (
    <div className="inline-block">
      {textLink ? (
        <a
          href="#"
          onClick={() => {
            sendGTMEvent({ event: 'showPopup' })
            document.getElementById("my_modal_3").showModal()
          }}
        >
          {ctaText}
        </a>
      ) : (
        <button
          className={`btn ${icon && icon.trim() ? 'flex items-center gap-2' : ''}`}
          style={{
            backgroundColor: buttonColor,
            color: "#FFFFFF",
            borderColor: buttonColor,
          }}
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          {icon && icon.trim() && iconPosition === "left" && <DynamicIcon iconName={icon} size={16} />}
          {ctaText}
          {icon && icon.trim() && iconPosition === "right" && <DynamicIcon iconName={icon} size={16} />}
        </button>
      )}

      <dialog id="my_modal_3" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-white">
          <h3 className="text-xl font-semibold lg:text-3xl">{ctaText}</h3>

          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-black absolute right-2 top-2"
              onClick={closeModal}
            >
              ✕
            </button>
          </form>
          <div className="text-black">
            {children}
            {formStatus === "success" ? (
              <p>Thank you for your submission!</p>
            ) : formStatus === "error" ? (
              <p>There was an error submitting the form. Please try again.</p>
            ) : useMailchimpAPI ? (
              <MailchimpPopupForm
                onFormSubmit={handleFormSubmit}
                mailchimpTags={mailchimpTags}
                includeNameField={includeNameField}
                placeholder={placeholder}
                namePlaceholder={namePlaceholder}
              />
            ) : formCode ? (
              <MailchimpFormEmbed
                embedHtml={formCode}
                onFormSubmit={handleFormSubmit}
              />
            ) : null}
          </div>
        </div>
      </dialog>
    </div>
  );
}
