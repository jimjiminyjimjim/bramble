import { fetchOneEntry, subscribeToEditor } from "@builder.io/sdk-react";
import { useEffect, useState, useRef, useContext } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { AiFillCloseCircle } from "react-icons/ai";
import { DynamicIcon } from "@/components/Icon";
import { useTheme } from "@/helpers/theme";
import { sendGTMEvent } from "@next/third-parties/google";

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
          mode: "no-cors"
        })
          .then(() => {
            console.log("Form successfully submitted 2");
            sendGTMEvent({ event: "popupFormSubmit" });
            sendGTMEvent({ event: "popupFormSubmit2" });
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

const MailchimpForm = ({
  includeNameField,
  mailchimpTags,
  onFormSubmit,
  buttonColor,
  textColor,
  ctaText,
  icon,
  iconPosition,
  size
}) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const searchParams = useSearchParams();
  const pathName = usePathname();

  // Get UTM parameters
  const initialSource = searchParams?.get("utm_source") || "";
  const initialMedium = searchParams?.get("utm_medium") || "";
  const initialCampaign = searchParams?.get("utm_campaign") || "";
  const campaignContent = searchParams?.get("utm_content") || "";
  const campaignTerms = searchParams?.get("utm_term") || "";
  const pageTitle = document?.title || "";

  // Define size classes (same as Button component)
  const getSizeClasses = (sizeType) => {
    switch (sizeType) {
      case "small":
        return "px-4 py-2 text-sm";
      case "large":
        return "px-8 py-4 text-lg";
      default: // medium
        return "px-6 py-3 text-base";
    }
  };

  const sizeClasses = getSizeClasses(size);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (honeypot) {
      // If the honeypot is filled, silently fail (bot detected)
      onFormSubmit("success");
      setEmail("");
      setName("");
      setError("");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name: includeNameField ? name : undefined,
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

      setEmail("");
      setName("");
      setError("");

      sendGTMEvent({
        event: "popupMailchimpSubmit",
        email,
        ...(includeNameField && name && { name })
      });

      onFormSubmit("success");
    } catch (error) {
      console.error("Subscription error:", error);
      setError("Failed to subscribe. Please try again.");
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
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        style={{
          position: "absolute",
          left: "-9999px",
          top: "-9999px",
          opacity: 0,
          pointerEvents: "none"
        }}
        tabIndex={-1}
        autoComplete="off"
      />

      {includeNameField && (
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      )}

      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full font-semibold transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 border cursor-pointer rounded-full text-center ${sizeClasses} ${icon && icon.trim() ? "flex items-center justify-center gap-2" : ""}`}
        style={{
          backgroundColor: isSubmitting ? "#9CA3AF" : buttonColor || "#3B82F6",
          color: textColor || "#FFFFFF",
          borderColor: isSubmitting ? "#9CA3AF" : buttonColor || "#3B82F6"
        }}
      >
        {icon && icon.trim() && iconPosition === "left" && (
          <span className="animate-pulse" style={{ animationDuration: "1s" }}>
            <DynamicIcon iconName={icon} size={16} className="font-bold" />
          </span>
        )}
        {isSubmitting ? "Subscribing..." : ctaText || "Subscribe"}
        {icon && icon.trim() && iconPosition === "right" && (
          <span className="animate-pulse" style={{ animationDuration: "1s" }}>
            <DynamicIcon iconName={icon} size={16} className="font-bold" />
          </span>
        )}
      </button>
    </form>
  );
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
  popupTitle,
  theme,
  textLink,
  buttonColor = "#3B82F6",
  textColor = "#FFFFFF",
  size = "medium",
  icon = "",
  iconPosition = "left",
  mailchimpForm = false,
  includeNameField = false,
  mailchimpTags = ""
}) {
  const colors = useTheme(theme);
  const [content, setContent] = useState(null);
  const [formStatus, setFormStatus] = useState(null);

  // Define size classes (same as Button component)
  const getSizeClasses = (sizeType) => {
    switch (sizeType) {
      case "small":
        return "px-4 py-2 text-sm";
      case "large":
        return "px-8 py-4 text-lg";
      default: // medium
        return "px-6 py-3 text-base";
    }
  };

  const sizeClasses = getSizeClasses(size);

  // const modalName = toCamelCase(ctaText || "");

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

  const handleBackdropClick = (e) => {
    // Only close if clicking directly on the dialog backdrop, not on any child elements
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  if (!content) return null;

  return (
    <div className="inline-block">
      {textLink ? (
        <a
          href="#"
          onClick={() => {
            sendGTMEvent({ event: "showPopup" });
            document.getElementById("my_modal_3").showModal();
          }}
        >
          {ctaText}
        </a>
      ) : (
        <button
          className={`font-semibold transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 border cursor-pointer rounded-full text-center ${sizeClasses} ${icon && icon.trim() ? "flex items-center gap-2" : ""}`}
          style={{
            backgroundColor: buttonColor,
            color: textColor,
            borderColor: buttonColor
          }}
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          {icon && icon.trim() && iconPosition === "left" && (
            <span className="animate-pulse" style={{ animationDuration: "1s" }}>
              <DynamicIcon iconName={icon} size={16} className="font-bold" />
            </span>
          )}
          {ctaText}
          {icon && icon.trim() && iconPosition === "right" && (
            <span className="animate-pulse" style={{ animationDuration: "1s" }}>
              <DynamicIcon iconName={icon} size={16} className="font-bold" />
            </span>
          )}
        </button>
      )}

      <dialog
        id="my_modal_3"
        className="modal modal-bottom sm:modal-middle"
        onClick={handleBackdropClick}
      >
        <div
          className="modal-box bg-white"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="text-xl font-semibold lg:text-3xl">{popupTitle}</h3>
          {children}
          {/* <form method="dialog"> */}
          <button
            className="btn btn-sm btn-circle btn-black absolute right-0 top-2 bg-transparent text-2xl"
            onClick={closeModal}
          >
            ✕
          </button>
          {/* </form> */}
          <div className="text-black">
            {formStatus === "success" ? (
              <p>Thank you for your submission!</p>
            ) : !mailchimpForm ? (
              <MailchimpForm
                includeNameField={includeNameField}
                mailchimpTags={mailchimpTags}
                onFormSubmit={handleFormSubmit}
                buttonColor={buttonColor}
                textColor={textColor}
                size={size}
                ctaText={ctaText}
                icon={icon}
                iconPosition={iconPosition}
              />
            ) : (
              formCode && (
                <MailchimpFormEmbed
                  embedHtml={formCode}
                  onFormSubmit={handleFormSubmit}
                />
              )
            )}
            {formStatus === "error" && (
              <p>There was an error submitting the form. Please try again.</p>
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
}
