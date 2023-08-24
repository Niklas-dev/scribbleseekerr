import { PoppinsLight } from "@/styles/fonts";
import React from "react";

export default function TagsDisplay({ tags }: { tags: string[] }) {
  return (
    <>
      {tags.map((tag, index) => (
        <div key={tag} className={index >= 5 ? "hidden" : ""}>
          <div
            className={`${PoppinsLight.className} px-2 py-[0.15rem] bg-[#222222] text-gray-300 rounded-md`}
          >
            {tag}
          </div>
        </div>
      ))}
    </>
  );
}
