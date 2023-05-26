"use client";
import LottiePlayer from "@/components/LottiePlayer";
import PostWrapper from "@/components/PostWrapper";
import TextPost from "@/components/TextPost";
import { useAuth } from "@/providers/auth";
import { LooseObject, Post } from "@/shared/types";
import {
  PoppinsBold,
  PoppinsLight,
  PoppinsRegular,
  PoppinsSemi,
} from "@/styles/fonts";
import Link from "next/link";
import React, { useEffect, useState } from "react";
export interface ProfileResponse {
  username: string;
  about: string;
  flames: number;
  pk: number;
  posts: Post[];
}
export default function Page() {
  const { user, loaded } = useAuth();

  const [profileData, setProfileData] = useState<ProfileResponse>();

  const getProfile = async () => {
    const handleSuccess = (response: ProfileResponse) => {
      console.log(response);
      setProfileData(response);
    };
    const handleError = (response: ProfileResponse) => {
      console.log(response);
    };

    let requestObject: LooseObject = {
      method: "GET",
      mode: "cors",
    };

    if (user) {
      requestObject["header"] = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_PATH}/users/get-profile?username=${
        user!.username
      }`,
      requestObject
    ).then(async (response) => {
      if (response.status === 200) {
        handleSuccess(await response.json());
      } else {
        handleError(await response.json());
      }
    });
  };

  useEffect(() => {
    if (loaded) {
      getProfile();
    }

    return () => {};
  }, [loaded]);

  return (
    <div className="bg-[#0e0e0e] flex flex-col overflow-y-scroll h-screen w-full px-6  sm:px-28 md:px-32 lg:px-36 xl:px-72">
      <div className="flex flex-row items-center justify-between  pt-8 gap-8">
        <Link
          href={"/texts"}
          className={`${PoppinsSemi.className} text-gray-100 text-lg border-2 border-gray-100 rounded-md px-4 py-2 transition-transform duration-300 hover:scale-95`}
        >
          Back
        </Link>
        <Link
          href={"/"}
          className={`${PoppinsSemi.className} text-gray-100 hidden md:block text-xl lg:text-3xl`}
        >
          Profile
        </Link>

        <div></div>
      </div>
      <div className="pt-10 flex flex-row justify-center w-full ">
        <div className="w-full md:w-fit max-w-[800px] h-fit py-8  rounded-lg ">
          <div className="bg-[#161616] h-fit py-8 w-full rounded-lg">
            <p
              className={`${PoppinsSemi.className} text-center text-gray-200 text-2xl`}
            >
              @{user?.username}
            </p>
            <div className="flex flex-row justify-center items-center gap-12 mt-4 px-16">
              <div className="h-[65px] w-[65px] min-h-[65px] min-w-[65px] md:h-[100px] md:w-[100px] rounded-full bg-gradient-to-br from-violet-500 to-blue-900 text-white grid place-content-center">
                Diez
              </div>
              <div className="flex sm:flex-row flex-col gap-10 ">
                <div className="flex flex-col justify-center items-center">
                  <p
                    className={`${PoppinsBold.className} text-gray-200 text-xl`}
                  >
                    {profileData?.posts.length}
                  </p>
                  <h3
                    className={`${PoppinsRegular.className} text-gray-200 text-xl`}
                  >
                    Posts
                  </h3>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <p
                    className={`${PoppinsBold.className} text-gray-200 text-xl`}
                  >
                    {profileData?.flames}
                  </p>
                  <h3
                    className={`${PoppinsRegular.className} text-gray-200 text-xl`}
                  >
                    Flames
                  </h3>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center px-20">
              {profileData?.about && (
                <p
                  className={`${PoppinsRegular.className} text-gray-200 text-lg text-center bg-[#222222] w-full p-2 mt-6 rounded-md`}
                >
                  {profileData!.about}
                </p>
              )}
            </div>
            <div className="flex flex-row justify-center mt-8 px-20 pb-8">
              <Link
                className={`${PoppinsSemi.className} text-[#0e0e0e] text-lg bg-gray-100 rounded-md px-2 py-2 transition-transform duration-300 hover:scale-95  w-full min-w-[75px] max-w-[100px] text-center`}
                href={"/user/edit"}
              >
                Edit
              </Link>
            </div>
          </div>
          <div className="w-full pt-8 flex-grow">
            <div className="flex flex-col items-center ">
              <h2
                className={`${PoppinsSemi.className} text-gray-200 text-2xl pb-8 `}
              >
                Your Posts
              </h2>

              <PostWrapper>
                {profileData?.posts.length! >= 1 ? (
                  <PostWrapper>
                    {profileData!.posts.map((post: Post, index: number) => {
                      return (
                        <TextPost
                          border={false}
                          error={(msg: string) => {}}
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
                  </PostWrapper>
                ) : (
                  <div className="flex flex-col justify-center items-center">
                    <h3
                      className={`${PoppinsSemi.className} text-gray-100 text-xl `}
                    >
                      No posts
                    </h3>
                    <LottiePlayer
                      src="https://assets4.lottiefiles.com/packages/lf20_WpDG3calyJ.json"
                      classes="w-[400px] h-[400px] mt-8"
                      autoplay
                      loop
                    />
                  </div>
                )}
              </PostWrapper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
