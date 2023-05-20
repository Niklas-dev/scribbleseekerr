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
import { useAuth } from "../../providers/auth";
import InitialsAvatar from "@/components/InitialsAvatar";

import PostWrapper from "@/components/PostWrapper";
import { useRouter, useSearchParams } from "next/navigation";
import LottiePlayer from "@/components/LottiePlayer";
import PostBlueprint from "@/components/PostBlueprint";
import ScrollToTop from "@/components/ScrollToTop";

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
  const [loadingData, setLoadingData] = useState(true);
  const [fetchedAll, setFetchedAll] = useState(true);
  const [page, setPage] = useState(0);
  const [posts, setPosts] = useState<Post[]>([]);
  const searchParams = useSearchParams();
  const text_type_param = searchParams.get("text_type");
  const router = useRouter();

  const getPosts = async (search: string, text_type: string) => {
    const response = await fetchWithParams(search, text_type, page);
    console.log(response);

    setPosts(response);
    setLoadingData(false);

    const pre_response = await fetchWithParams(search, text_type, page + 1);

    if (pre_response.length === 0) {
      setFetchedAll(true);
    } else {
      setFetchedAll(false);
    }
  };

  useEffect(() => {
    setLoadingData(true);
    const getPostTimer = setTimeout(() => {
      getPosts(postSearch, text_type_param!);
    }, 1000);
    return () => {
      setPage(0);
      setPosts([]);
      clearTimeout(getPostTimer);
      setLoadingData(true);
      setFetchedAll(false);
    };
  }, [postSearch]);

  useEffect(() => {
    loginWithToken();
    getPosts(postSearch, text_type_param!);

    return () => onDismount();
  }, [loaded]);

  const fetchWithParams = async (
    search: string,
    text_type: string,
    currentPage: number
  ): Promise<any> => {
    return fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_PATH}/posts/get-posts?count=${currentPage}&text_type=${text_type}&search=${search}`,
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
  };

  const loadMore = async (search: string, text_type: string) => {
    const response = await fetchWithParams(search, text_type, page + 1);
    console.log(response);
    setPage((_prev) => _prev + 1);
    setPosts((_prev) => [..._prev, ...response]);
    setLoadingData(false);

    const pre_response = await fetchWithParams(search, text_type, page + 2);

    if (pre_response.length === 0) {
      setFetchedAll(true);
    } else {
      setFetchedAll(false);
    }
  };

  const onDismount = () => {
    setPosts([]);
    setLoadingData(true);
    setFetchedAll(false);
    setPostSearch("");
    setPage(0);
  };
  const topRef = React.useRef<HTMLDivElement>(null);
  return (
    <div className="bg-[#0e0e0e] overflow-y-scroll h-screen w-full ">
      <ScrollToTop topRef={topRef} />
      <div
        ref={topRef}
        className="flex flex-row items-center justify-between px-6  sm:px-28 md:px-32 lg:px-36 xl:px-72 pt-8 gap-8"
      >
        <Link
          href={"/"}
          className={`${PoppinsSemi.className} text-gray-100 hidden md:block text-xl lg:text-3xl`}
        >
          ScribbleSeekerr
        </Link>

        <div className="flex flex-row items-center gap-2">
          <div className="relative">
            <FaSearch className="absolute top-4 left-4" color="#F3F4F6" />
            <input
              onChange={(e) => setPostSearch(e.target.value)}
              className={`${PoppinsSemi.className} h-12 w-11/12 md:w-[20rem] lg:w-[30rem] rounded-lg text-lg pl-10 pr-2 py-1 outline-none bg-[#1d1d1d] text-gray-100 shadow-lg`}
              type="text"
            ></input>
          </div>
          <Link
            href={"/create-post"}
            className={`${PoppinsSemi.className} text-[#0e0e0e] grid items-center text-base whitespace-nowrap lg:text-lg bg-gray-100 rounded-md px-4 py-2 h-12 transition-transform duration-300 hover:scale-95`}
          >
            New Post
          </Link>
        </div>
        {user ? (
          <InitialsAvatar href="/user" username={user.username} />
        ) : (
          <div></div>
        )}
      </div>
      <div className="px-20 lg:px-80 pt-20">
        <div className="flex flex-row justify-center gap-4 pb-10">
          {loadingData ? (
            <LottiePlayer
              src="https://assets10.lottiefiles.com/packages/lf20_x62chJ.json"
              classes="w-[400px] h-[400px] mt-8"
              autoplay
              loop
            />
          ) : (
            <>
              {posts.length >= 1 ? (
                <PostWrapper>
                  {(posts as Post[]).map((post: Post, index: number) => {
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
                  })}

                  {!fetchedAll && (
                    <div className="w-full  flex flex-row py-4 justify-center">
                      <button
                        onClick={() => loadMore(postSearch, text_type_param!)}
                        className={`${PoppinsSemi.className} text-[#0e0e0e] text-lg bg-gray-100 rounded-md px-4 py-2 transition-transform duration-300 hover:scale-95`}
                      >
                        Load more
                      </button>
                    </div>
                  )}
                </PostWrapper>
              ) : (
                <div className="flex flex-col justify-center items-center">
                  <h3
                    className={`${PoppinsSemi.className} text-gray-100 text-xl `}
                  >
                    No matching post
                  </h3>
                  <LottiePlayer
                    src="https://assets4.lottiefiles.com/packages/lf20_WpDG3calyJ.json"
                    classes="w-[400px] h-[400px] mt-8"
                    autoplay
                    loop
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
