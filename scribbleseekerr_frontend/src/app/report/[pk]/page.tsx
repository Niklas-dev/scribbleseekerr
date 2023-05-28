"use client";
import InitialsAvatar from "@/components/InitialsAvatar";
import { useAuth } from "@/providers/auth";
import { PoppinsBold, PoppinsRegular, PoppinsSemi } from "@/styles/fonts";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextareaAutosize from "react-textarea-autosize";
export default function Page({ params }: { params: { pk: number } }) {
  const { user, loaded } = useAuth();

  const [reportData, setReportData] = useState({
    pk: params.pk,
    reason: "",
    description: "",
    important: false,
  });

  useEffect(() => {
    return () => {};
  }, [loaded]);

  return (
    <>
      <ToastContainer
        theme="dark"
        position="top-center"
        closeButton
        autoClose={2000}
        limit={3}
      />

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
                Report Post
              </h3>
            </div>
            <div className="flex flex-col pt-8">
              <label
                className={`${PoppinsRegular.className} text-gray-100 text-lg md:text-xl pb-1`}
                htmlFor="id"
              >
                Post <sup>(ID)</sup>
              </label>

              <input
                onChange={(e) => {
                  let newData = reportData;
                  newData.pk = parseInt(e.target.value);
                  setReportData(newData);
                }}
                defaultValue={reportData.pk}
                id="id"
                className={`${PoppinsSemi.className} h-12 w-full rounded-lg text-lg py-1 outline-none bg-[#1d1d1d] text-gray-100 shadow-lg px-4 `}
                type="text"
              ></input>
            </div>
            <div className="flex flex-col pt-8">
              <label
                className={`${PoppinsRegular.className} text-gray-100 text-lg md:text-xl pb-1`}
                htmlFor="title"
              >
                Reason
              </label>

              <select
                defaultValue={reportData.reason}
                onChange={(e) => {
                  let newData = reportData;
                  newData.reason = e.target.value;
                  setReportData(newData);
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
                Description <sup>(Optional)</sup>
              </label>
              <TextareaAutosize
                onChange={(e) => {
                  let newData = reportData;
                  newData.description = e.target.value;
                  setReportData(newData);
                }}
                defaultValue={reportData.description}
                cacheMeasurements
                minRows={3}
                className={`${PoppinsSemi.className} h-96 w-full rounded-lg text-lg py-1 outline-none bg-[#1d1d1d] text-gray-100 shadow-lg px-4 resize-none `}
              />
            </div>
            <div className="flex flex-col pt-8 items-start">
              <label
                className={`${PoppinsRegular.className} text-gray-100 text-lg md:text-xl pb-1`}
                htmlFor="title"
              >
                Mark as very important
              </label>
              <input
                onChange={(e) => {
                  let newData = reportData;
                  newData.important = !newData.important;
                  setReportData(newData);
                }}
                defaultChecked={reportData.important}
                className="scale-150 checked:accent-green-600 ml-4 mt-2 "
                type="checkbox"
              />
            </div>
            <div className="w-full pt-8">
              <button
                onClick={() => console.log(reportData)}
                className={`${PoppinsSemi.className} w-full text-[#0e0e0e] text-base whitespace-nowrap lg:text-lg bg-gray-100 rounded-md px-4 grid items-center h-12 transition-transform duration-300 hover:scale-95`}
              >
                Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
