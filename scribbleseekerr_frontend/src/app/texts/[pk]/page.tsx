import ContentDisplay from "@/components/ContentDisplay";
import Flames from "@/components/Flames";
import LottiePlayer from "@/components/LottiePlayer";
import TagsDisplay from "@/components/TagsDisplay";
import { LooseObject, Post } from "@/shared/types";
import {
  PoppinsBold,
  PoppinsLight,
  PoppinsRegular,
  PoppinsSemi,
} from "@/styles/fonts";
import Link from "next/link";
import React from "react";

const fetchPost = async (pk: number): Promise<Post | null> => {
  let requestObject: LooseObject = {
    method: "GET",
    mode: "cors",
    cache: "no-store",
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_PATH}/posts/get-post?pk=${pk}`,
    requestObject
  )
    .then(async (response) =>
      response.status === 200 ? await response.json() : null
    )
    .then((data) => data);

  return response;
};

export default async function Page({ params }: { params: { pk: number } }) {
  const postData = await fetchPost(params.pk);
  return (
    <div className="bg-[#0e0e0e] flex flex-col overflow-y-scroll h-screen w-full px-6  sm:px-28 md:px-32 lg:px-36 xl:px-72 py-10">
      <div className="flex flex-row items-center justify-between  py-8 gap-8 ">
        <Link
          href={"/texts"}
          className={`${PoppinsSemi.className} text-gray-100 text-lg border-2 border-gray-100 rounded-md px-4 py-2 transition-transform duration-300 hover:scale-95`}
        >
          Back
        </Link>
        <h2
          className={`${PoppinsSemi.className} text-gray-100 text-xl lg:text-3xl capitalize`}
        >
          {postData?.text_type}
        </h2>

        <div></div>
      </div>
      {postData ? (
        <div className="mt-20 w-full bg-[#161616] py-8 px-8 rounded-lg h-fit flex flex-col gap-2">
          <Flames
            scale="scale-110"
            pk={postData.pk}
            flameUsersProp={postData?.flames!}
          />
          <h3
            className={`${PoppinsBold.className} text-gray-100  text-2xl pt-6`}
          >
            {postData?.title}
          </h3>
          <ContentDisplay
            textcolor="300"
            className={`${PoppinsLight.className}   text-xl `}
            content={postData?.content!}
          />

          <Link
            href={`user/${postData?.author}`}
            className={`${PoppinsRegular.className} text-lg  text-gray-400 z-20 hover:underline w-fit pt-8`}
          >
            Published by{" "}
            <b className={`${PoppinsBold.className} text-gray-100`}>
              {postData?.author}
            </b>
          </Link>
          <div className="flex flex-row gap-2 ">
            {postData?.tags ? <TagsDisplay tags={postData.tags} /> : null}
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
            The post has not been found. It could be deleted.
          </h3>
        </div>
      )}
    </div>
  );
}
