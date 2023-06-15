"use client";
import InitialsAvatar from "@/components/InitialsAvatar";
import { PoppinsBold, PoppinsRegular, PoppinsSemi } from "@/styles/fonts";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../providers/auth";
import TextareaAutosize from "react-textarea-autosize";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { customStyles } from "@/styles/custom";
import PostHasBeenInfo from "@/components/PostHasBeenInfo";
import { withAuth } from "@/components/WithAuth";
const animatedComponents = makeAnimated();

interface IPostData {
  title: string;
  text_type: string;
  content: string;
  tags: Array<string>;
}
function Page() {
  const { user } = useAuth();
  const [options, setOptions] = useState([]);
  const [isSent, setIsSent] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const error = (message: string) => toast.error(message);
  const [postData, setPostData] = useState<IPostData>({
    title: "",
    text_type: "story",
    content: "",
    tags: [],
  });
  const router = useRouter();

  const handleSuccess = (response: any) => {
    setIsCreated(true);
    const timeout = setTimeout(() => {
      setIsCreated(false);
      router.push("/texts");
    }, 2450);
  };
  const handleError = (response: any) => {
    let errorMessage = "";
    console.log(response);
    if ("title" in response) {
      errorMessage = "Fill out all fields.";
    }
    if ("content" in response) {
      errorMessage = "Fill out all fields.";
    }
    if ("tags" in response) {
      errorMessage = "Fill out all fields.";
    }
    error(errorMessage);
  };

  const createPost = async () => {
    const currentIsSentState = isSent;

    if (!currentIsSentState) {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_PATH}/posts/create-post`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(postData),
      }).then(async (response) =>
        response.status === 200
          ? handleSuccess(await response.json())
          : handleError(await response.json())
      );
    }
  };

  const fetchTags = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_PATH}/posts/get-tags`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    ).then((response) => response.json());

    let newOptions = response.map((tag: { pk: number; name: string }) => {
      return { value: `${tag.name}`, label: `${tag.name}` };
    });

    setOptions(newOptions);
  };

  useEffect(() => {
    fetchTags();

    return () => setIsCreated(false);
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
      {isCreated ? (
        <PostHasBeenInfo
          lottieSrc="https://assets9.lottiefiles.com/private_files/lf30_nsqfzxxx.json"
          text="Post has been created."
        />
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

            {user ? (
              <InitialsAvatar href="/user" username={user.username} />
            ) : (
              <div></div>
            )}
          </div>
          <div className="pt-20 pb-36 flex flex-row justify-center">
            <div className="bg-[#161616] flex flex-col p-6 rounded-lg max-w-[1000px] w-full">
              <div className="w-full flex flex-row justify-center">
                <h3
                  className={`${PoppinsBold.className} text-gray-100 text-lg lg:text-2xl `}
                >
                  New Post
                </h3>
              </div>
              <div className="flex flex-col pt-8">
                <label
                  className={`${PoppinsRegular.className} text-gray-100 text-lg md:text-xl pb-1`}
                  htmlFor="title"
                >
                  Post title
                </label>
                <input
                  onChange={(e) => {
                    let newData = postData;

                    newData.title = e.target.value;

                    setPostData(newData);
                  }}
                  id="title"
                  className={`${PoppinsSemi.className} h-12 w-full rounded-lg text-lg py-1 outline-none bg-[#1d1d1d] text-gray-100 shadow-lg px-4 `}
                  type="text"
                ></input>
              </div>
              <div className="flex flex-col pt-8">
                <label
                  className={`${PoppinsRegular.className} text-gray-100 text-lg md:text-xl pb-1`}
                  htmlFor="title"
                >
                  Text type
                </label>
                <select
                  onChange={(e) => {
                    let newData = postData;

                    newData.text_type = e.target.value;

                    setPostData(newData);
                  }}
                  className="w-fit outline-none bg-[#1d1d1d] text-gray-100 h-12 px-2 rounded-lg text-xl shadow-lg "
                >
                  <option className="text-xl" value="story">
                    Story
                  </option>
                  <option className="text-xl" value="poem">
                    Poem
                  </option>
                  <option className="text-xl" value="paper">
                    Paper
                  </option>
                </select>
              </div>
              <div className="flex flex-col pt-8">
                <label
                  className={`${PoppinsRegular.className} text-gray-100 text-lg md:text-xl pb-1`}
                  htmlFor="title"
                >
                  Content
                </label>
                <TextareaAutosize
                  onChange={(e) => {
                    let newData = postData;

                    newData.content = e.target.value;

                    setPostData(newData);
                  }}
                  cacheMeasurements
                  minRows={10}
                  className={`${PoppinsSemi.className} h-96 w-full rounded-lg text-lg py-1 outline-none bg-[#1d1d1d] text-gray-100 shadow-lg px-4 resize-none `}
                />
              </div>
              <div className="flex flex-col pt-8">
                <label
                  className={`${PoppinsRegular.className} text-gray-100 text-lg md:text-xl pb-1`}
                  htmlFor="title"
                >
                  Tags
                </label>
                <Select
                  styles={customStyles}
                  onChange={(e) => {
                    let newData = postData;
                    let newArray: Array<string> = [];
                    e.map((tag: any) => newArray.push(tag.value));
                    newData.tags = newArray;

                    setPostData(newData);
                    console.log(newData);
                  }}
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  options={options}
                />
              </div>
              <div className="w-full pt-8">
                <button
                  onClick={() => createPost()}
                  className={`${PoppinsSemi.className} w-full text-[#0e0e0e] text-base whitespace-nowrap lg:text-lg bg-gray-100 rounded-md px-4 grid items-center h-12 transition-transform duration-300 hover:scale-95`}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default withAuth(Page);
