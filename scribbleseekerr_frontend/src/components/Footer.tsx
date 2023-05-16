import { PoppinsBold, PoppinsRegular } from "@/styles/fonts";
import React from "react";

export default function Footer() {
  return (
    <footer className=" min-h-[150px] w-full bg-[#161616] flex flex-col justify-between">
      <div className="mx-4 px-2 py-2"></div>
      <div className="border-t-[1px] border-[#333333] px-2 mx-4 py-4 flex flex-row justify-between">
        <h4 className={`${PoppinsBold.className} text-gray-100 `}>
          ScribbleSeekerr
        </h4>
        <h4
          className={`${PoppinsRegular.className} text-gray-100 cursor-pointer`}
        >
          by <b>@Niklas-dev</b>
        </h4>
      </div>
    </footer>
  );
}
