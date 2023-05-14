"use client";
import { PoppinsBold } from "@/styles/fonts";
import React, { useEffect, useState } from "react";
import { FaFire } from "react-icons/fa";
import { KeyedMutator } from "swr";
import { FlameUser } from "./TextPost";
import { useAuth } from "@/app/providers/auth";

export default function Flames({
  flameUsersProp,
  mutate,
  pk,
}: {
  pk: number;
  flameUsersProp: FlameUser[];
  mutate: (pk: number, arg: "down" | "up") => void;
}) {
  const [flameUsers, setFlameUsers] = useState<FlameUser[]>(flameUsersProp);

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
    isFlamed(flameUsersProp)
  );

  useEffect(() => {
    console.log(flameUsersProp);

    return () => {};
  }, []);

  return (
    <div
      onClick={() => {
        if (alreadyFlamed) {
          mutate(pk, "down");
        }
      }}
      className="flex flex-row items-center gap-1 bg-[#222222] w-fit px-2 rounded-md py-[0.15rem] cursor-pointer hover:bg-[#2c2c2c] transition-colors duration-200 "
    >
      <FaFire size={20} color="orange" />
      <div>{alreadyFlamed.toString()}</div>
      <p className={`${PoppinsBold.className} text-gray-100 text-lg `}>
        {flameUsers.length}
      </p>
    </div>
  );
}
