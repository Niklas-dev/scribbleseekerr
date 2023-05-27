import Flames from "@/components/Flames";
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
    .then(async (response) => {
      if (response.status === 200) {
        return await response.json();
      } else {
        return null;
      }
    })
    .then((data) => data);
  console.log(response);
  return response;
};
export default async function Page({ params }: { params: { pk: number } }) {
  const postData = await fetchPost(params.pk);
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
          className={`${PoppinsSemi.className} text-gray-100 text-xl lg:text-3xl capitalize`}
        >
          {postData?.text_type}
        </Link>

        <div></div>
      </div>
      <div className="mt-20 w-full bg-[#161616] py-4 px-8 rounded-lg h-fit">
        <Flames scale="scale-110" pk={2} flameUsersProp={postData!.flames} />
        <h3 className={`${PoppinsBold.className} text-gray-100  text-2xl pt-4`}>
          {postData?.title}
        </h3>
        <p className={`${PoppinsLight.className} text-gray-200  text-xl pt-2 `}>
          {postData?.content}
        </p>
      </div>
      {JSON.stringify(postData)}
    </div>
  );
}
