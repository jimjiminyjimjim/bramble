import { fetchOneEntry, subscribeToEditor } from "@builder.io/sdk-react";
import { useEffect, useState, useRef, useContext } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useTheme } from "@/helpers/theme";


function toCamelCase(text) {
  return text
    .toLowerCase() // Convert the text to lowercase
    .replace(/[^a-z0-9]+(.)/g, (match, char) => char.toUpperCase()); // Remove non-alphanumeric chars and capitalize following letters
}

export function TandCs({ children, ctaText, ...rest }) {
  console.log("rest", rest);
  const modalName = toCamelCase(ctaText || "");

  const closeModal = () => {
    const modal = document.getElementById(modalName);
    modal.close() 
  }

  return (
    <>
      <a
        href="#"
        onClick={() => document.getElementById(modalName).showModal()}
      >
        {ctaText}
      </a>

      <dialog id={modalName} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-white w-11/12 max-w-5xl">
          <h3 className="text-xl text-black font-semibold lg:text-3xl">{ctaText}</h3>

          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-black absolute right-2 top-2"
              onClick={closeModal}
            >
              ✕
            </button>
          </form>
          <div className="text-black">{children}</div>
        </div>
      </dialog>
    </>
  );
}
