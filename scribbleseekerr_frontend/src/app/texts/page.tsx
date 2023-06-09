"use client";
import TextPost from "@/components/TextPost";
import { PoppinsSemi } from "@/styles/fonts";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useAuth } from "../../providers/auth";
import InitialsAvatar from "@/components/InitialsAvatar";
import PostWrapper from "@/components/PostWrapper";
import { useSearchParams } from "next/navigation";
import LottiePlayer from "@/components/LottiePlayer";
import ScrollToTop from "@/components/ScrollToTop";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Post } from "@/shared/types";

export default function Page() {
  const { user, loaded, loginWithToken } = useAuth();
  const [postSearch, setPostSearch] = useState("");
  const [loadingData, setLoadingData] = useState(true);
  const [fetchedAll, setFetchedAll] = useState(true);
  const [page, setPage] = useState(0);
  const [posts, setPosts] = useState<Post[]>([]);
  const topRef = React.useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const text_type_param = searchParams.get("text_type");
  const [linkSearch, setLinkSearch] = useState(text_type_param);

  const error = (message: string) => toast.error(message);

  const getPosts = async (search: string, text_type: string) => {
    const response = await fetchWithParams(search, text_type, page);

    setPosts(response);
    setLoadingData(false);

    await checkForMoreData(search, text_type, page + 1);
  };

  const loadMore = async (search: string, text_type: string) => {
    const response = await fetchWithParams(search, text_type, page + 1);

    setPage((_prev) => _prev + 1);
    setPosts((_prev) => [..._prev, ...response]);
    setLoadingData(false);

    await checkForMoreData(search, text_type, page + 2);
  };

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

  const checkForMoreData = async (
    thisSearch: string,
    textType: string,
    thisPage: number
  ): Promise<any> => {
    const pre_response = await fetchWithParams(thisSearch, textType, thisPage);

    setFetchedAll(pre_response.length === 0);
  };

  useEffect(() => {
    const getPostTimer = setTimeout(() => {
      getPosts(postSearch, text_type_param!);
    }, 1000);
    return () => onUnmountSearch(getPostTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postSearch, text_type_param]);

  useEffect(() => {
    loginWithToken();
    getPosts("", linkSearch!);

    return () => onUnmountLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [linkSearch]);

  const onUnmountSearch = (postTimer: NodeJS.Timeout) => {
    setPage(0);
    setPosts([]);
    clearTimeout(postTimer);
    setLoadingData(true);
    setFetchedAll(false);
  };

  const onUnmountLogin = () => {
    setPosts([]);
    setLoadingData(true);
    setFetchedAll(false);
    setPostSearch("");
    setPage(0);
  };

  return (
    <div className="bg-[#0e0e0e] overflow-y-auto h-screen w-full overflow-x-hidden">
      <ToastContainer
        theme="dark"
        position="top-center"
        closeButton
        autoClose={2000}
        limit={3}
      />
      <ScrollToTop topRef={topRef} />
      <div
        ref={topRef}
        className="flex flex-row items-center justify-between px-6  sm:px-28 md:px-16 lg:px-28 xl:px-72 pt-8 gap-8"
      >
        <Link
          href={"/"}
          className={`${PoppinsSemi.className} text-gray-100 hidden md:block text-xl lg:text-2xl`}
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
          {user && (
            <Link
              href={"/create-post"}
              className={`${PoppinsSemi.className} text-[#0e0e0e] grid items-center text-base whitespace-nowrap lg:text-lg bg-gray-100 rounded-md px-4 py-2 h-12 transition-transform duration-300 hover:scale-95`}
            >
              New Post
            </Link>
          )}
        </div>
        {user ? (
          <InitialsAvatar href="/user" username={user.username} />
        ) : (
          <div></div>
        )}
      </div>
      <div className="px-20 lg:px-80  flex flex-col items-center pt-6">
        <div className="flex-row gap-3 sm:gap-4 flex">
          <Link
            onClick={() => setLinkSearch("poem")}
            className={`${PoppinsSemi.className} text-gray-200 text-lg md:text-xl`}
            href={"/texts?text_type=poem"}
          >
            Poems
          </Link>
          <Link
            onClick={() => setLinkSearch("story")}
            className={`${PoppinsSemi.className} text-gray-200 text-lg md:text-xl`}
            href={"/texts?text_type=story"}
          >
            Stories
          </Link>
          <Link
            onClick={() => setLinkSearch("paper")}
            className={`${PoppinsSemi.className} text-gray-200 text-lg md:text-xl`}
            href={"/texts?text_type=paper"}
          >
            Papers
          </Link>
          <Link
            onClick={() => setLinkSearch("all")}
            className={`${PoppinsSemi.className} text-gray-200 text-lg md:text-xl`}
            href={"/texts?text_type=all"}
          >
            Any
          </Link>
        </div>
        <div className="flex flex-row justify-center gap-4 pb-10 pt-16">
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
                        border={false}
                        error={(msg: string) => error(msg)}
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
