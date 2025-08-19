"use client";
import { useRef } from "react";
import { Blocks } from "@builder.io/sdk-react";
import { DynamicIcon } from "../Icon";
import { sendGTMEvent } from "@next/third-parties/google";

export function PopupNew({
  textLink,
  ctaText,
  buttonColor,
  textColor,
  icon,
  iconPosition,
  size = "medium",
  ...props
}) {
  const modalRef = useRef(null);

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

  const closeModal = () => {
    modalRef.current?.close();
  };

  const handleBackdropClick = (e) => {
    // Only close if clicking directly on the dialog backdrop, not on any child elements
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className="inline-block">
      {textLink ? (
        <a
          href="#"
          onClick={() => {
            sendGTMEvent({ event: "showPopup" });
            modalRef.current?.showModal();
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
          onClick={() => modalRef.current?.showModal()}
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
        ref={modalRef}
        className="modal modal-bottom sm:modal-middle"
        onClick={handleBackdropClick}
      >
        <div
          className="modal-box bg-white p-10"
          onClick={(e) => e.stopPropagation()}
        >
            <Blocks
              blocks={props.column1}
              path="component.options.column1"
              parent={props.builderBlock.id}
              registeredComponents={props.builderComponents}
              context={props.builderContext}
              linkComponent={props.builderLinkComponent}
            />
          <button
            className="btn btn-sm btn-circle btn-black absolute right-0 top-2 bg-transparent text-2xl"
            onClick={closeModal}
          >
            ✕
          </button>
        </div>
      </dialog>
    </div>
  );
}
