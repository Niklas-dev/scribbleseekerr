import { ProfileResponse } from "@/app/user/page";
import { LooseObject } from "@/shared/types";
import React from "react";
const fetchUser = async (username: string): Promise<ProfileResponse | null> => {
  let requestObject: LooseObject = {
    method: "GET",
    mode: "cors",
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
  const userData = await fetchUser(params.username);
  return <div>{JSON.stringify(userData)}</div>;
}
