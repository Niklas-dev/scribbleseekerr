import { PoppinsRegular } from "@/styles/fonts";
import React from "react";

export default function ReasonImportant({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (e: any) => void;
}) {
  return (
    <>
      <label
        className={`${PoppinsRegular.className} text-gray-100 text-lg md:text-xl pb-1`}
        htmlFor="title"
      >
        Mark as very important
      </label>
      <input
        onChange={(e) => onChange(e)}
        defaultChecked={value}
        className="scale-150 checked:accent-green-600 ml-4 mt-2 "
        type="checkbox"
      />
    </>
  );
}
