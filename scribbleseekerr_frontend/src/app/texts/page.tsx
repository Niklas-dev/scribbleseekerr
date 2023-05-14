"use client";
import PostWrapperLeft from "@/components/PostWrapperLeft";
import PostWrapperRight from "@/components/PostWrapperRight";
import TextPost from "@/components/TextPost";
import {
  PoppinsBold,
  PoppinsLight,
  PoppinsRegular,
  PoppinsSemi,
} from "@/styles/fonts";
import Link from "next/link";
import React, { useEffect } from "react";

import { FaSearch, FaArrowUp, FaFire } from "react-icons/fa";
import { useAuth } from "../providers/auth";
import InitialsAvatar from "@/components/InitialsAvatar";
// @ts-ignore

export default function Page() {
  const { user, loaded, loginWithToken } = useAuth();
  useEffect(() => {
    loginWithToken();
    return () => {};
  }, [loaded]);

  return (
    <div className="bg-[#0e0e0e] overflow-y-scroll h-screen w-full">
      <div className="absolute bottom-6 right-6 h-14 w-14 bg-gray-100 grid place-content-center rounded-full shadow-xl">
        <FaArrowUp size={20} color="black" />
      </div>
      <div className="flex flex-row items-center justify-between  px-4 sm:px-28 md:px-32 lg:px-36 xl:px-72 pt-8 gap-8">
        <Link
          href={"/"}
          className={`${PoppinsSemi.className} text-gray-100 text-3xl`}
        >
          ScribbleSeekerr
        </Link>

        <div className="relative">
          <FaSearch className="absolute top-4 left-4" color="#F3F4F6" />
          <input
            className={`${PoppinsSemi.className} h-12 w-[30rem] rounded-lg text-lg pl-10 pr-2 py-1 outline-none bg-[#1d1d1d] text-gray-100 shadow-lg`}
            type="text"
          ></input>
        </div>
        <InitialsAvatar href="/user" username={user?.username as string} />
      </div>
      <div className="px-80 pt-20">
        <div></div>
        <div className="columns-2 gap-2">
          <TextPost
            author="Niklas"
            title="An Officer's Dog"
            flames={32}
            tags={["#story", "#animals"]}
            content="Max was not just any dog. He was a Belgian Malinois, a breed known
            for their high intelligence and excellent working abilities. His
            human family was a team of K-9 officers, who trained him to be a
            police dog. One day, Max was on a mission with his handler, Officer
            Johnson. They were tracking a dangerous criminal who had fled into
            the woods. As they followed the scent, Max caught a whiff of
            something else - a familiar scent from his past. It was the scent of
            his previous owner, who had abandoned him when he was just a puppy.
            Max had always wondered about his past, and now, he was determined
            to follow the scent and find out more. Despite Officer
            Johnson's commands, Max veered off the trail and followed the
            scent. It led him to an abandoned cabin, where he found a frail and
            elderly man. The man was barely conscious, and Max could sense that
            he was in grave danger. Max barked loudly to get Officer
            Johnson's attention. The officer followed the sound and found
            Max standing guard over the man. Together, they were able to get the
            man to safety and call for medical attention. As it turned out, the
            man was a retired K-9 officer who had been missing for weeks. He had
            trained Max when he was a puppy and had left the force under
            mysterious circumstances. Max had never forgotten the scent of his
            first owner, and his instincts had led him to save the man's
            life. From that day forward, Max and Officer Johnson became even
            closer. They knew that Max's bravery had saved not just the
            retired officer's life but also helped catch the dangerous
            criminal they had been tracking. Max's past had caught up with
            him, but it had only made him a better police dog and a more loyal
            companion."
          />
          <TextPost
            author="Niklas"
            title="An Officer's Dog"
            flames={32}
            tags={["#story", "#animals"]}
            content="Max was not just any dog. He was a Belgian Malinois, a breed known
            for their high intelligence and excellent working abilities. His
            human family was a team of K-9 officers, who trained him to be a
            police dog. One day, Max was on a mission with his handler, Officer
            Johnson. They were tracking a dangerous criminal who had fled into
            the woods. As they followed the scent, Max caught a whiff of
            something else - a familiar scent from his past. It was the scent of
            his previous owner, who had abandoned him when he was just a puppy.
            Max had always wondered about his past, and now, he was determined
            to follow the scent and find out more. Despite Officer
            Johnson's commands, Max veered off the trail and followed the
            scent. It led him to an abandoned cabin, where he found a frail and
            elderly man. The man was barely conscious, and Max could sense that
            he was in grave danger. Max barked loudly to get Officer
            Johnson's attention. The officer followed the sound and found
            Max standing guard over the man. Together, they were able to get the
            man to safety and call for medical attention. As it turned out, the
            man was a retired K-9 officer who had been missing for weeks. He had
            trained Max when he was a puppy and had left the force under
            mysterious circumstances. Max had never forgotten the scent of his
            first owner, and his instincts had led him to save the man's
            life. From that day forward, Max and Officer Johnson became even
            closer. They knew that Max's bravery had saved not just the
            retired officer's life but also helped catch the dangerous
            criminal they had been tracking. Max's past had caught up with
            him, but it had only made him a better police dog and a more loyal
            companion."
          />
        </div>
        <div className="flex flex-row justify-center gap-2 pb-10">
          <PostWrapperLeft></PostWrapperLeft>
          <PostWrapperRight></PostWrapperRight>
        </div>
      </div>
    </div>
  );
}
