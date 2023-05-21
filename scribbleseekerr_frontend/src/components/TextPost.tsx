"use client";
import {
  PoppinsBold,
  PoppinsLight,
  PoppinsRegular,
  PoppinsSemi,
} from "@/styles/fonts";
import React, { useEffect, useState } from "react";
import { FaFire } from "react-icons/fa";
import Flames from "./Flames";

export interface FlameUser {
  pk: number;
  username: string;
}
export interface TextPostProps {
  error: (msg: string) => void;
  pk: number;
  author: string;
  flameUsers: FlameUser[];
  title: string;
  content: string;
  tags: Array<string>;
}
export default function TextPost({
  pk,
  author,
  flameUsers,
  title,
  content,
  tags,
  error,
}: TextPostProps) {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
    return () => {
      setFadeIn(false);
    };
  }, []);
  return (
    <div
      className={`fade-in-post ${
        fadeIn ? "active" : ""
      } w-full h-fit bg-[#161616] rounded-md shadow-md flex flex-col justify-end p-4 overflow-x-hidden cursor-pointer z-10`}
    >
      <Flames error={error} pk={pk} flameUsersProp={flameUsers} />
      <h5 className={`${PoppinsSemi.className} text-gray-100 text-lg pt-2`}>
        {title}
      </h5>
      <p className={`${PoppinsLight.className} text-gray-400 text-base`}>
        {content.split("\n").map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
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
                className={`${PoppinsLight.className} px-2 py-[0.15rem] bg-[#222222] text-gray-300 rounded-md`}
              >
                {tag}
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
