"use client";
import { PoppinsBold } from "@/styles/fonts";
import React, { useEffect, useState } from "react";
import { FaFire } from "react-icons/fa";
import { KeyedMutator } from "swr";
import { FlameUser } from "./TextPost";
import { useAuth } from "@/app/providers/auth";

export default function Flames({
  flameUsersProp,
  pk,
}: {
  pk: number;
  flameUsersProp: FlameUser[];
}) {
  const [flameUsers, setFlameUsers] = useState<FlameUser[]>(flameUsersProp);

  const [flameCount, setFlameCount] = useState(flameUsersProp.length);

  const { user } = useAuth();

  const isFlamed = (_flameUsers: FlameUser[]): boolean => {
    for (let index in flameUsers) {
      if (flameUsers[index].username == user?.username) {
        return true;
      }
    }
    return false;
  };

  const [alreadyFlamed, setAlreadyFlamed] = useState<boolean>(
    isFlamed(flameUsers)
  );

  const updateFlames = async (arg: string, pk: number) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_PATH}/posts/update-flames`,
      {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({
          pk: pk,
          arg: arg,
        }),
      }
    ).then(async (response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw Error;
      }
    });

    let data = await response;
    console.log(data);
    setFlameUsers(data);
    setFlameCount(data.length);
  };

  return (
    <div
      onClick={async () => {
        if (alreadyFlamed) {
          setFlameCount((_prev) => _prev - 1);
          setAlreadyFlamed((_prev) => !_prev);

          updateFlames("down", pk);
        } else {
          setFlameCount((_prev) => _prev + 1);
          setAlreadyFlamed((_prev) => !_prev);

          updateFlames("up", pk);
        }
      }}
      className={`flex flex-row items-center gap-1 w-fit px-2 rounded-md py-[0.15rem] cursor-pointer hover:bg-[#2c2c2c] transition-colors duration-200 z-20 ${
        alreadyFlamed ? "bg-orange-500 bg-opacity-25" : "bg-[#222222]"
      }`}
    >
      <FaFire size={20} color="orange" />

      <p className={`${PoppinsBold.className} text-gray-100 text-lg `}>
        {flameCount}
      </p>
    </div>
  );
}