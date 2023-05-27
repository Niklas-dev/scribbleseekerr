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
import { FlameUser } from "@/shared/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import TagsDisplay from "./TagsDisplay";
import ContentDisplay from "./ContentDisplay";

export interface TextPostProps {
  error?: (msg: string) => void;
  pk: number;
  author: string;
  flameUsers: FlameUser[];
  title: string;
  content: string;
  tags: Array<string>;
  border: boolean;
}
export default function TextPost({
  pk,
  author,
  flameUsers,
  title,
  content,
  tags,
  error,
  border,
}: TextPostProps) {
  const [fadeIn, setFadeIn] = useState(false);

  const router = useRouter();

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
      } w-full h-fit bg-[#161616] rounded-md shadow-md flex flex-col justify-end p-4 overflow-x-hidden cursor-pointer  ${
        border && "border-2 border-gray-100"
      }`}
    >
      <Flames error={error!} pk={pk} flameUsersProp={flameUsers} />

      <h5
        onClick={() => router.push(`texts/${pk}`)}
        className={`${PoppinsSemi.className} text-gray-100 text-lg pt-2 hover:underline`}
      >
        {title}
      </h5>
      <ContentDisplay textcolor="400" content={content} />

      <Link
        href={`user/${author}`}
        className={`${PoppinsRegular.className} text-1xl text-gray-400 pt-4 z-20 hover:underline w-fit`}
      >
        Published by{" "}
        <b className={`${PoppinsBold.className} text-gray-100`}>{author}</b>
      </Link>
      <div className="flex flex-row gap-2 pt-4">
        {tags ? <TagsDisplay tags={tags} /> : null}
      </div>
    </div>
  );
}
