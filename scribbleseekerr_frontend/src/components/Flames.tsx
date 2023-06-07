"use client";
import { PoppinsBold } from "@/styles/fonts";
import React, { useEffect, useState } from "react";
import { FaFire } from "react-icons/fa";

import { useAuth } from "@/providers/auth";
import { FlameUser } from "@/shared/types";

export default function Flames({
  flameUsersProp,
  pk,
  error,
  scale,
}: {
  pk: number;
  flameUsersProp: FlameUser[];
  error?: (msg: string) => void;
  scale?: string;
}) {
  const [flameUsers, setFlameUsers] = useState<FlameUser[]>(flameUsersProp);

  const [flameCount, setFlameCount] = useState(flameUsersProp.length);

  const { user } = useAuth();

  const isFlamed = (flameUsersLocal: FlameUser[]): boolean => {
    return flameUsersLocal.some(
      (flameUser) => flameUser.username === user?.username
    );
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

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div
      onClick={async () => {
        if (user) {
          if (alreadyFlamed) {
            setFlameCount((_prev) => _prev - 1);
            setAlreadyFlamed((_prev) => !_prev);

            updateFlames("down", pk);
          } else {
            setFlameCount((_prev) => _prev + 1);
            setAlreadyFlamed((_prev) => !_prev);

            updateFlames("up", pk);
          }
        } else {
          error!("You need to be signed in.");
        }
      }}
      className={`flex flex-row items-center gap-1 w-14 px-2 rounded-md py-[0.15rem] cursor-pointer hover:bg-[#2c2c2c] transition-colors duration-200  z-30 ${scale} ${
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
