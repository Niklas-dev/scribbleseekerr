import {
  PoppinsBold,
  PoppinsLight,
  PoppinsRegular,
  PoppinsSemi,
} from "@/styles/fonts";
import React from "react";
import { FaFire } from "react-icons/fa";
import Flames from "./Flames";
import { KeyedMutator } from "swr";

export interface FlameUser {
  pk: number;
  username: string;
}
export interface TextPostProps {
  pk: number;
  author: string;
  flameUsers: FlameUser[];
  title: string;
  content: string;
  tags: Array<string>;
  mutate: (pk: number, num: "down" | "up") => void;
}
export default function TextPost({
  pk,
  author,
  flameUsers,
  title,
  content,
  tags,
  mutate,
}: TextPostProps) {
  return (
    <div className="w-full h-fit bg-[#161616] rounded-md shadow-md flex flex-col justify-end p-4">
      <Flames pk={pk} mutate={mutate} flameUsersProp={flameUsers} />
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
        {tags
          ? tags.map((tag) => (
              <div
                key={tag}
                className={`${PoppinsLight.className} px-2 py-[0.15rem] bg-[#222222] text-gray-300 rounded-sm`}
              >
                {tag}
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
