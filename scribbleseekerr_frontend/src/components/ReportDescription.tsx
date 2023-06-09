import { PoppinsRegular, PoppinsSemi } from "@/styles/fonts";
import React from "react";
import TextareaAutosize from "react-textarea-autosize";
export default function ReportDescription({
  value,
  onChange,
}: {
  value: string | number;
  onChange: (e: any) => void;
}) {
  return (
    <>
      <label
        className={`${PoppinsRegular.className} text-gray-100 text-lg md:text-xl pb-1`}
        htmlFor="title"
      >
        Description <sup>(Optional)</sup>
      </label>
      <TextareaAutosize
        onChange={(e) => onChange(e)}
        defaultValue={value}
        cacheMeasurements
        minRows={3}
        className={`${PoppinsSemi.className} h-96 w-full rounded-lg text-lg py-1 outline-none bg-[#1d1d1d] text-gray-100 shadow-lg px-4 resize-none `}
      />
    </>
  );
}
