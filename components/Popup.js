import { fetchOneEntry, subscribeToEditor } from "@builder.io/sdk-react";
import { useEffect, useState, useRef, useContext } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useTheme } from "@/helpers/theme";

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
            console.log("Form successfully submitted");
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
}) {
  const colors = useTheme(theme);
  const [content, setContent] = useState(null);
  const [formStatus, setFormStatus] = useState(null);

  const modalName = toCamelCase(ctaText || "");

  useEffect(() => {
    setContent(true);
  }, []);

  const closeModal = () => {
    const modal = document.getElementById("my_modal_3");
    modal.close();
  };

  if (!content) return null;

  return (
    <>
      {textLink ? (
        <a
          href="#"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          {ctaText}
        </a>
      ) : (
        <button
          className={`btn`}
          style={{
            backgroundColor: colors?.button.dark,
            color: colors?.button.text,
          }}
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          {ctaText}
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
            {/* {formStatus === "success" ? (
              <p>Thank you for your submission!</p>
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
            )} */}
          </div>
        </div>
      </dialog>
    </>
  );
}
