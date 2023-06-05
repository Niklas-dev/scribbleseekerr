import { PoppinsRegular, PoppinsSemi } from "@/styles/fonts";
import React from "react";

export default function ReportPostID({
  value,
  onChange,
}: {
  value: number;
  onChange: (e: any) => void;
}) {
  return (
    <>
      <label
        className={`${PoppinsRegular.className} text-gray-100 text-lg md:text-xl pb-1`}
        htmlFor="id"
      >
        Post <sup>(ID)</sup>
      </label>

      <input
        onChange={(e) => onChange(e)}
        defaultValue={value}
        id="id"
        className={`${PoppinsSemi.className} h-12 w-full rounded-lg text-lg py-1 outline-none bg-[#1d1d1d] text-gray-100 shadow-lg px-4 `}
        type="text"
      ></input>
    </>
  );
}
