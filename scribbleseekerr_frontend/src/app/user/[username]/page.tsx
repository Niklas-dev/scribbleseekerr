import { ProfileResponse } from "@/app/user/page";
import LottiePlayer from "@/components/LottiePlayer";
import PostWrapper from "@/components/PostWrapper";
import TextPost from "@/components/TextPost";
import UserNavBar from "@/components/UserNavBar";
import { LooseObject, Post } from "@/shared/types";
import { PoppinsBold, PoppinsRegular, PoppinsSemi } from "@/styles/fonts";
import Link from "next/link";
import React from "react";
const createInitials = (name: string) => name.substring(0, 3);
const fetchUser = async (username: string): Promise<ProfileResponse | null> => {
  let requestObject: LooseObject = {
    method: "GET",
    mode: "cors",
    cache: "no-store",
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_PATH}/users/get-profile?username=${username}`,
    requestObject
  )
    .then(async (response) => {
      if (response.status === 200) {
        return await response.json();
      } else {
        return null;
      }
    })
    .then((data) => data);
  return response;
};
export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const profileData = await fetchUser(params.username);
  return (
    <div className="bg-[#0e0e0e] flex flex-col overflow-y-scroll h-screen w-full px-6  sm:px-28 md:px-32 lg:px-36 xl:px-72">
      <UserNavBar />
      {profileData ? (
        <div className="pt-10 flex flex-row justify-center w-full ">
          <div className="w-full md:w-fit max-w-[800px] h-fit py-8  rounded-lg ">
            <div className="bg-[#161616] h-fit py-8 w-full rounded-lg">
              <p
                className={`${PoppinsSemi.className} text-center text-gray-200 text-2xl`}
              >
                @{profileData?.username}
              </p>
              <div className="flex flex-row justify-center items-center gap-12 mt-4 px-16">
                <div className="h-[65px] w-[65px] min-h-[65px] min-w-[65px] md:h-[100px] md:w-[100px] rounded-full bg-gradient-to-br from-violet-500 to-blue-900 text-white grid place-content-center">
                  {createInitials(profileData?.username)}
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
      ) : (
        <div className="flex flex-col justify-center items-center h-full max-h-[600px] min-h-[200px]">
          <LottiePlayer
            src="https://assets4.lottiefiles.com/packages/lf20_WpDG3calyJ.json"
            classes="w-[400px] h-[400px] mt-8"
            autoplay
            loop
          />
          <h3
            className={`${PoppinsSemi.className} text-gray-100 text-xl text-center`}
          >
            The user has not been found. It could be deleted.
          </h3>
        </div>
      )}
    </div>
  );
}
