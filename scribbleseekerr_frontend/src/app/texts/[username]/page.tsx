import React from "react";
const fetchUser = async (username: string) => {};
export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const userData = await fetchUser(params.username);
  return <div>page</div>;
}
