"use client";
import PostWrapperLeft from "@/components/PostWrapperLeft";
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
import useSWR from "swr";
// @ts-ignore

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

export default function Page() {
  const { user, loaded, loginWithToken } = useAuth();
  useEffect(() => {
    loginWithToken();
    return () => {};
  }, [loaded]);

  const [page, setPage] = useState(0);
  const getPosts = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_PATH}/posts/get-posts?count=${page}`,
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
    return response;
  };

  const { data, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_PATH}/posts/get-posts?count=${page}`,
    getPosts
  );

  const updateFlames = (pk: number, arg: "down" | "up") => {
    return data;
  };

  function updateFlamesByPK(
    objects: Post[],
    pk: number,
    newFlames: FlameUser[]
  ): Post[] {
    return objects.map((obj) => {
      if (obj.pk === pk) {
        return {
          ...obj,
          flames: newFlames,
        };
      }
      return obj;
    });
  }
  return (
    <div className="bg-[#0e0e0e] overflow-y-scroll h-screen w-full">
      <div className="absolute bottom-6 right-6 h-14 w-14 bg-gray-100 grid place-content-center rounded-full shadow-xl">
        <FaArrowUp size={20} color="black" />
      </div>
      <div className="flex flex-row items-center justify-between  px-4 sm:px-28 md:px-32 lg:px-36 xl:px-72 pt-8 gap-8">
        <Link
          href={"/"}
          className={`${PoppinsSemi.className} text-gray-100 text-3xl`}
        >
          ScribbleSeekerr
        </Link>

        <div className="relative">
          <FaSearch className="absolute top-4 left-4" color="#F3F4F6" />
          <input
            className={`${PoppinsSemi.className} h-12 w-[30rem] rounded-lg text-lg pl-10 pr-2 py-1 outline-none bg-[#1d1d1d] text-gray-100 shadow-lg`}
            type="text"
          ></input>
        </div>
        <InitialsAvatar href="/user" username={user?.username as string} />
      </div>
      <div className="px-80 pt-20">
        <div className="flex flex-row justify-center gap-2 pb-10">
          <PostWrapperLeft>
            {data
              ? (data as Post[]).map((post: Post, index: number) => {
                  return (
                    <TextPost
                      mutate={(pk: number, arg: "down" | "up") => {
                        let result = new Map(
                          post.flames.map((i) => [i.pk, i.username])
                        );

                        if (arg === "down") {
                          result.delete(user!.pk);
                          console.log(user!.pk);
                        } else {
                          result.set(user!.pk, user!.username);
                        }

                        const newData: Array<Object> = [];

                        result.forEach((key, val) =>
                          newData.push({ pk: key, username: val })
                        );

                        console.log(newData);
                        console.log(post);

                        let newPosts: Post[] = updateFlamesByPK(
                          data,
                          pk,
                          newData as FlameUser[]
                        );
                        console.log(data);
                        console.log(newPosts);

                        mutate(updateFlames(pk, "up"), {
                          optimisticData: [...newPosts],
                          rollbackOnError: true,
                          populateCache: true,
                          revalidate: false,
                        });
                      }}
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
          </PostWrapperLeft>
          <PostWrapperRight></PostWrapperRight>
        </div>
      </div>
    </div>
  );
}
