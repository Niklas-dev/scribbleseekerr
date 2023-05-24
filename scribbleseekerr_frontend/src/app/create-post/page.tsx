"use client";
import InitialsAvatar from "@/components/InitialsAvatar";
import ScrollToTop from "@/components/ScrollToTop";
import { PoppinsBold, PoppinsRegular, PoppinsSemi } from "@/styles/fonts";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useAuth } from "../../providers/auth";
import TextareaAutosize from "react-textarea-autosize";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import LottiePlayer from "@/components/LottiePlayer";
import { useRouter } from "next/navigation";
const animatedComponents = makeAnimated();

interface IPostData {
  title: string;
  text_type: string;
  content: string;
  tags: Array<string>;
}
export default function Page() {
  const { user, loaded, loginWithToken } = useAuth();
  const [options, setOptions] = useState([]);
  const [isCreated, setIsCreated] = useState(false);
  const [postData, setPostData] = useState<IPostData>({
    title: "",
    text_type: "story",
    content: "",
    tags: [],
  });
  const router = useRouter();

  const createPost = async () => {
    const handleSuccess = (response: any) => {
      setIsCreated(true);
      const timeout = setTimeout(() => {
        router.push("/texts");
      }, 2400);
    };
    const handleError = (response: any) => {
      console.log(response);
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_PATH}/posts/create-post`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(postData),
      }
    ).then(async (response) => {
      if (response.status === 200) {
        handleSuccess(await response.json());
      } else {
        handleError(await response.json());
      }
    });
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

  const customStyles = {
    control: (base: any, state: any) => ({
      ...base,
      height: "3rem",
      background: "#1d1d1d",
      fontSize: "1.125rem",
      // match with the menu

      borderRadius: 8,
      // Overwrittes the different states of border
      borderColor: "transparent",
      // Removes weird border around container
      boxShadow: state.isFocused ? null : null,
      "&:hover": {
        // Overwrittes the different states of border
        borderColor: state.isFocused ? "#F3F4F6" : "#F3F4F6",
      },
    }),
    menu: (base: any) => ({
      ...base,
      // override border radius to match the box

      borderRadius: 0,
      // kill the gap
      marginTop: 0,
    }),
    menuList: (base: any) => ({
      ...base,
      // kill the white space on first and last option

      padding: 12,
    }),
  };

  useEffect(() => {
    fetchTags();

    return () => {
      setIsCreated(false);
    };
  }, []);

  return (
    <>
      {isCreated ? (
        <div className="bg-[#0e0e0e] overflow-y-scroll h-screen w-full grid items-center">
          <div className="flex flex-col justify-center items-center">
            <LottiePlayer
              src="https://assets9.lottiefiles.com/private_files/lf30_nsqfzxxx.json"
              classes="w-[400px] h-[400px] mt-8"
              autoplay
            />
            <h3
              className={`${PoppinsBold.className} text-gray-100 text-xl text-center`}
            >
              Post has been created.
            </h3>
          </div>
        </div>
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
