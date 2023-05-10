import {
  PoppinsBold,
  PoppinsLight,
  PoppinsRegular,
  PoppinsSemi,
} from "@/styles/fonts";
import React from "react";
import { FaFire } from "react-icons/fa";

interface TextPostProps {
  author: string;
  flames: number;
  title: string;
  content: string;
  tags: Array<string>;
}
export default function TextPost({
  author,
  flames,
  title,
  content,
  tags,
}: TextPostProps) {
  return (
    <div className="w-fit h-fit bg-[#161616] rounded-md shadow-md flex flex-col justify-end p-4">
      <div className="flex flex-row items-center gap-1 bg-[#222222] w-fit px-2 rounded-md py-[0.15rem]">
        <FaFire size={20} color="orange" />
        <p className={`${PoppinsBold.className} text-gray-100 text-lg`}>
          {flames}
        </p>
      </div>
      <h5 className={`${PoppinsSemi.className} text-gray-100 text-lg pt-2`}>
        {title}
      </h5>
      <p className={`${PoppinsLight.className} text-gray-400 text-base`}>
        {content}
      </p>
      <p className={`${PoppinsRegular.className} text-1xl text-gray-400 pt-4`}>
        Published by{" "}
        <b className={`${PoppinsBold.className} text-gray-100`}>{author}</b>
      </p>
      <div className="flex flex-row gap-2 pt-4">
        {tags.map((tag) => (
          <div
            key={tag}
            className={`${PoppinsLight.className} px-2 py-[0.15rem] bg-[#222222] text-gray-300 rounded-sm`}
          >
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
}
