import { fetchOneEntry, subscribeToEditor } from "@builder.io/sdk-react";
import { useEffect, useState, useRef } from "react";

const MailchimpFormEmbed = ({ embedHtml }) => {
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

export function Popup({ children, formCode, siteData }) {
  const [content, setContent] = useState(undefined);

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
        className="btn"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        open modal
      </button>
      <dialog id="my_modal_1" className="modal p-0">
        <div className="modal-box p-0">
          {children}
          {formCode && <MailchimpFormEmbed embedHtml={content} />}
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
