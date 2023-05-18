import React, { RefObject } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTop({
  topRef,
}: {
  topRef: RefObject<HTMLDivElement>;
}) {
  return (
    <button
      onClick={() => {
        topRef.current!.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }}
      className="fixed bottom-6 right-6  h-14 w-14 bg-gray-100 grid place-content-center rounded-full shadow-xl z-30"
    >
      <FaArrowUp size={20} color="black" />
    </button>
  );
}
