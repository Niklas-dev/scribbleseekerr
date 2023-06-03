"use client";
import PostHasBeenDeletedInfo from "@/components/PostHasBeenDeletedInfo";
import { LooseObject, Post } from "@/shared/types";
import { PoppinsBold, PoppinsRegular, PoppinsSemi } from "@/styles/fonts";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Page({ params }: { params: { pk: number } }) {
  const [postData, setPostData] = useState<Post>();
  const [isDeleted, setIsDeleted] = useState(false);
  const error = (message: string) => toast.error(message);
  const router = useRouter();

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
  const deletePost = async (pk: number): Promise<void> => {
    let requestObject: LooseObject = {
      method: "DELETE",
      mode: "cors",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify({ pk: pk }),
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_PATH}/posts/delete-post`,
      requestObject
    )
      .then(async (response) => {
        if (response.status === 200) {
          setIsDeleted(true);
          const timeout = setTimeout(() => {
            setIsDeleted(false);
            router.push("/texts");
          }, 2450);
          return await response.json();
        } else {
          let message = await response.json();
          error(message);
          return null;
        }
      })
      .then((data) => data);
    console.log(response);
    return response;
  };

  useEffect(() => {
    async function fetchData() {
      let data = await fetchPost(params.pk);

      setPostData(data!);
    }

    fetchData();

    return () => {};
  }, []);

  return (
    <>
      <ToastContainer
        theme="dark"
        position="top-center"
        closeButton
        autoClose={2000}
        limit={3}
      />

      {isDeleted ? (
        <PostHasBeenDeletedInfo />
      ) : (
        <div className="bg-[#0e0e0e] overflow-y-scroll h-screen w-full px-6  sm:px-28 md:px-32 lg:px-36 xl:px-72">
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
              ScribbleSeekerr
            </Link>
            <div></div>
          </div>
          <div className="pt-20 pb-36 flex flex-row justify-center">
            {postData ? (
              <div className="bg-[#161616] flex flex-col p-6 rounded-lg max-w-[1000px] w-1/2">
                <div className="w-full flex flex-row justify-center">
                  <h3
                    className={`${PoppinsBold.className} text-gray-100 text-lg lg:text-2xl `}
                  >
                    Do you want to delete this post?
                  </h3>
                </div>
                <div className="flex flex-col items-center">
                  <h4
                    className={`${PoppinsRegular.className} text-gray-100 text-lg lg:text-2xl pt-10`}
                  >
                    {postData?.title}
                  </h4>
                </div>
                <div className="flex flex-row items-center justify-center gap-4 pt-20">
                  <Link
                    className={`${PoppinsSemi.className} text-gray-100 text-lg border-2 border-gray-100 rounded-md px-4 py-1 transition-transform duration-300 hover:scale-95`}
                    href="/texts"
                  >
                    No
                  </Link>
                  <button
                    onClick={() => deletePost(params.pk)}
                    className={`${PoppinsSemi.className} text-[#0e0e0e] text-lg bg-gray-100 rounded-md px-4 py-1 transition-transform duration-300 hover:scale-95`}
                  >
                    Yes
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h3
                  className={`${PoppinsBold.className} text-gray-100 text-lg lg:text-2xl `}
                >
                  This post doesnt exist anymore.
                </h3>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
