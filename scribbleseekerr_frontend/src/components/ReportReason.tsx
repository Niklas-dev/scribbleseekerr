import { PoppinsRegular } from "@/styles/fonts";
import React from "react";

export default function ReportReason({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: any) => void;
}) {
  return (
    <>
      <label
        className={`${PoppinsRegular.className} text-gray-100 text-lg md:text-xl pb-1`}
        htmlFor="title"
      >
        Reason
      </label>

      <select
        defaultValue={value}
        onChange={(e) => onChange(e)}
        className="w-fit outline-none bg-[#1d1d1d] text-gray-100 h-12 px-2 rounded-lg text-xl shadow-lg "
      >
        <option className="text-xl" value="plagiarism">
          Plagiarism
        </option>
        <option className="text-xl" value="dangerous">
          Dangerous
        </option>
        <option className="text-xl" value="offensive">
          Offensive
        </option>
        <option className="text-xl" value="hate_speech">
          Hate Speech
        </option>
        <option className="text-xl" value="nsfw">
          Nsfw
        </option>
        <option className="text-xl" value="illegal">
          Illegal
        </option>
        <option className="text-xl" value="other">
          Other
        </option>
      </select>
    </>
  );
}
