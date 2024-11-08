import { fetchOneEntry, subscribeToEditor } from "@builder.io/sdk-react";
import { useEffect, useState, useRef, useContext } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useTheme } from "@/helpers/theme";

const MailchimpFormEmbed = ({ embedHtml, siteData }) => {
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
            // Handle success feedback
            // document.getElementById("my_modal_3").close()
          })
          .catch((error) => {
            console.error("Form submission error:", error);
            // Handle error feedback
          });
      };

      // Attach the custom submit handler to the form
      form.addEventListener("submit", handleFormSubmit);

      // Cleanup the event listener when the component is unmounted
      return () => form.removeEventListener("submit", handleFormSubmit);
    }
  }, [embedHtml]);

  return <div ref={formRef} dangerouslySetInnerHTML={{ __html: embedHtml }} />;
};

export function Popup({ children, formCode, siteData, ctaText, theme }) {

  console.log("popup theme", theme);
  const colors = useTheme(theme);
  const [content, setContent] = useState(undefined);

  console.log("POPUP COLORS", colors);

  useEffect(() => {
    // fetch initial data
    fetchOneEntry({
      model: "popup",
      apiKey: "a42db2ee068342eda145f280f84fd130",
    })
      .then((item) => setContent(item.data.mailchimpForm))
      .catch((err) => {
        console.error(
          "something went wrong while fetching Builder Content: ",
          err
        );
      });
  }, []);

  return (
    <>
      <button
        className={`btn`}
        style={{backgroundColor: colors?.button.dark, color: colors?.button.text}}
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        {ctaText}
      </button>
      <dialog id="my_modal_3" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-white">
          <h3 className="text-xl font-semibold lg:text-3xl">
            {ctaText}
          </h3>

          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-black absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="text-black">
            {children}
            {formCode && <MailchimpFormEmbed embedHtml={content} />}
          </div>
        </div>
      </dialog>
    
    </>
  );
}
