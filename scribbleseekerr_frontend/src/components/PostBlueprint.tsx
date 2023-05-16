import {
  PoppinsBold,
  PoppinsLight,
  PoppinsRegular,
  PoppinsSemi,
} from "@/styles/fonts";
import React from "react";

export default function PostBlueprint() {
  return (
    <div className="w-full h-[400px] bg-[#161616] rounded-md shadow-md flex flex-col justify-end p-4 overflow-x-hidden cursor-pointer z-10 skeleton">
      <div></div>
      <h5
        className={`${PoppinsSemi.className} text-gray-100 text-lg pt-2`}
      ></h5>
      <p className={`${PoppinsLight.className} text-gray-400 text-base`}></p>
      <p className={`${PoppinsRegular.className} text-1xl text-gray-400 pt-4`}>
        Published by{" "}
        <b className={`${PoppinsBold.className} text-gray-100`}></b>
      </p>
      <div className="flex flex-row gap-2 pt-4">
        <div
          className={`${PoppinsLight.className} px-2 py-[0.15rem] bg-[#222222] text-gray-300 rounded-md`}
        ></div>
      </div>
    </div>
  );
}
