"use client";
import PostWrapperLeft from "@/components/PostWrapper";
import PostWrapperRight from "@/components/PostWrapperRight";
import TextPost, { FlameUser } from "@/components/TextPost";
import {
  PoppinsBold,
  PoppinsLight,
  PoppinsRegular,
  PoppinsSemi,
} from "@/styles/fonts";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { FaSearch, FaArrowUp, FaFire } from "react-icons/fa";
import { useAuth } from "../providers/auth";
import InitialsAvatar from "@/components/InitialsAvatar";

import PostWrapper from "@/components/PostWrapper";
import { useRouter, useSearchParams } from "next/navigation";

interface Post {
  text_type: string;
  pk: number;
  title: string;
  author: string;
  content: string;
  flames: FlameUser[];
  tags: string[];
  created_at: string;
}

export default function Page({ params }: { params: { text_type: string } }) {
  const { user, loaded, loginWithToken } = useAuth();
  const [postSearch, setPostSearch] = useState("");

  const searchParams = useSearchParams();

  const text_type_param = searchParams.get("text_type");
  useEffect(() => {
    loginWithToken();
    return () => {};
  }, [loaded]);

  const [page, setPage] = useState(0);
  const getPosts = async (search: string, text_type: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_PATH}/posts/get-posts?count=${page}&text_type=${text_type}`,
      {
        method: "GET",
        mode: "cors",
      }
    ).then(async (response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw Error;
      }
    });
    console.log(response);

    setPosts(response);
  };

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getPosts(postSearch, text_type_param!);
    console.log(text_type_param);

    return () => {
      setPosts([]);
    };
  }, [postSearch]);

  return (
    <div className="bg-[#0e0e0e] overflow-y-scroll h-screen w-full ">
      <button
        onClick={() => {
          console.log("test");
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
        className="absolute bottom-6 right-6 h-14 w-14 bg-gray-100 grid place-content-center rounded-full shadow-xl z-30"
      >
        <FaArrowUp size={20} color="black" />
      </button>
      <div className="flex flex-row items-center justify-between px-6  sm:px-28 md:px-32 lg:px-36 xl:px-72 pt-8 gap-8">
        <Link
          href={"/"}
          className={`${PoppinsSemi.className} text-gray-100 hidden md:block text-xl lg:text-3xl`}
        >
          ScribbleSeekerr
        </Link>

        <div className="relative">
          <FaSearch className="absolute top-4 left-4" color="#F3F4F6" />
          <input
            onChange={(e) => setPostSearch(e.target.value)}
            className={`${PoppinsSemi.className} h-12 w-11/12 md:w-[20rem] lg:w-[30rem] rounded-lg text-lg pl-10 pr-2 py-1 outline-none bg-[#1d1d1d] text-gray-100 shadow-lg`}
            type="text"
          ></input>
        </div>
        <InitialsAvatar href="/user" username={user?.username as string} />
      </div>
      <div className="px-20 lg:px-80 pt-20">
        <div className="flex flex-row justify-center gap-4 pb-10">
          <PostWrapper>
            {posts
              ? (posts as Post[]).map((post: Post, index: number) => {
                  return (
                    <TextPost
                      key={post.pk}
                      pk={post.pk}
                      title={post.title}
                      content={post.content}
                      flameUsers={post.flames}
                      tags={post.tags}
                      author={post.author}
                    />
                  );
                })
              : null}
          </PostWrapper>
        </div>
      </div>
    </div>
  );
}
