"use client";

import Image from "next/image";

export function ConversationBubble({
  question = "What's your question?",
  answer = "This is the answer to the question.",
  profileImage = "",
  profileName = "Name",
  profileHandle = "",
  questionBackgroundColor = "#FFFFFF",
  questionTextColor = "#1a1a2e",
  answerBackgroundColor = "#7C6AE8",
  answerTextColor = "#FFFFFF",
  builderBlock,
}) {
  return (
    <div
      className="w-full flex flex-col gap-6"
      {...(builderBlock?.id ? { "builder-id": builderBlock.id } : {})}
    >
      {/* Question Bubble */}
      <div
        className="w-full rounded-2xl px-6 py-5 md:px-8 md:py-6"
        style={{ backgroundColor: questionBackgroundColor }}
      >
        <p
          className="text-lg md:text-xl lg:text-2xl font-semibold text-center"
          style={{ color: questionTextColor }}
        >
          {question}
        </p>
      </div>

      {/* Answer Section */}
      <div className="flex items-start gap-4 md:gap-6">
        {/* Profile Section */}
        <div className="flex flex-col items-center flex-shrink-0">
          {profileImage ? (
            <div className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-white/80 shadow-lg">
              <Image
                src={profileImage}
                alt={profileName}
                width={112}
                height={112}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div
              className="w-20 h-20 md:w-28 md:h-28 rounded-full flex items-center justify-center border-4 border-white/80 shadow-lg"
              style={{ backgroundColor: answerBackgroundColor }}
            >
              <span className="text-2xl md:text-3xl font-bold" style={{ color: answerTextColor }}>
                {profileName.charAt(0)}
              </span>
            </div>
          )}
          <div className="mt-3 text-center">
            <p className="font-semibold text-white text-sm md:text-base">{profileName}</p>
            {profileHandle && (
              <p className="text-white/70 text-xs md:text-sm">{profileHandle}</p>
            )}
          </div>
        </div>

        {/* Answer Bubble with tail */}
        <div className="flex-1 relative">
          {/* Speech bubble tail */}
          <div
            className="absolute left-0 top-8 -translate-x-3 w-0 h-0"
            style={{
              borderTop: "12px solid transparent",
              borderBottom: "12px solid transparent",
              borderRight: `16px solid ${answerBackgroundColor}`,
            }}
          />
          <div
            className="rounded-3xl px-6 py-5 md:px-8 md:py-6 shadow-lg"
            style={{ backgroundColor: answerBackgroundColor }}
          >
            <p
              className="text-base md:text-lg lg:text-xl italic leading-relaxed"
              style={{ color: answerTextColor }}
            >
              {answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
