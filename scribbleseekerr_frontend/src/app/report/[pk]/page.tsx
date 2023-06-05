"use client";
import InitialsAvatar from "@/components/InitialsAvatar";
import { useAuth } from "@/providers/auth";
import { PoppinsBold, PoppinsSemi } from "@/styles/fonts";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import ReportCreated from "@/components/ReportCreated";
import ReportReason from "@/components/ReportReason";
import ReportPostID from "@/components/ReportPostID";
import ReportImportant from "@/components/ReportImportant";
import ReportDescription from "@/components/ReportDescription";
export default function Page({ params }: { params: { pk: number } }) {
  const { user, loaded } = useAuth();
  const error = (message: string) => toast.error(message);
  const [isCreated, setIsCreated] = useState(false);
  const [reportData, setReportData] = useState({
    pk: params.pk,
    reason: "plagiarism",
    description: "",
    important: false,
  });

  const router = useRouter();

  const createReport = async () => {
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
      if ("pk" in response) {
        errorMessage = "Add the post id.";
      } else {
        errorMessage = "An error has occurred.";
      }
      error(errorMessage);
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_PATH}/posts/report-post`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(reportData),
      }
    ).then(async (response) => {
      if (response.status === 200) {
        handleSuccess(await response.json());
      } else {
        handleError(await response.json());
      }
    });
  };

  useEffect(() => {
    return () => {
      setIsCreated(false);
    };
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

      {isCreated ? (
        <ReportCreated />
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
                  Report Post
                </h3>
              </div>
              <div className="flex flex-col pt-8">
                <ReportPostID
                  value={reportData.pk}
                  onChange={(e) => {
                    let newData = reportData;
                    newData.pk = parseInt(e.target.value);
                    setReportData(newData);
                  }}
                />
              </div>
              <div className="flex flex-col pt-8">
                <ReportReason
                  value={reportData.reason}
                  onChange={(e) => {
                    let newData = reportData;
                    newData.reason = e.target.value;
                    setReportData(newData);
                  }}
                />
              </div>
              <div className="flex flex-col pt-8">
                <ReportDescription
                  value={reportData.description}
                  onChange={(e) => {
                    let newData = reportData;
                    newData.description = e.target.value;
                    setReportData(newData);
                  }}
                />
              </div>
              <div className="flex flex-col pt-8 items-start">
                <ReportImportant
                  value={reportData.important}
                  onChange={(e) => {
                    let newData = reportData;
                    newData.important = !newData.important;
                    setReportData(newData);
                  }}
                />
              </div>
              <div className="w-full pt-8">
                <button
                  onClick={() => createReport()}
                  className={`${PoppinsSemi.className} w-full text-[#0e0e0e] text-base whitespace-nowrap lg:text-lg bg-gray-100 rounded-md px-4 grid items-center h-12 transition-transform duration-300 hover:scale-95`}
                >
                  Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
