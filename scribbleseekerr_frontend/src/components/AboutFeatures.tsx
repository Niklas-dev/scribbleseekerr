import { PoppinsBold, PoppinsLight, PoppinsSemi } from "@/styles/fonts";
import React from "react";
import LottiePlayer from "./LottiePlayer";

export default function AboutFeatures() {
  return (
    <div className="mt-44 pb-20 flex flex-col items-center">
      <h3
        className={`${PoppinsBold.className} text-gray-100 text-2xl  lg:text-3xl xl:text-4xl text-center h-fit rounded-full px-4 pt-4 w-fit xl:w-[65rem]`}
      >
        Next stop? Your creativity and imagination!
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-2  gap-2 pt-20 h-fit ">
        <div className="w-72 h-56  rounded-md flex flex-col justify-end p-4">
          <p className="text-4xl ">🧐</p>
          <h5 className={`${PoppinsSemi.className} text-gray-100 text-lg pt-2`}>
            Different Texts!
          </h5>
          <p className={`${PoppinsLight.className} text-gray-400 text-base`}>
            Find a large variety of texts. Funny, lovely, scary, smart or even
            weird.
          </p>
        </div>
        <div className="w-72 h-56  rounded-md flex flex-col justify-end p-4">
          <p className="text-4xl ">🤖</p>
          <h5 className={`${PoppinsSemi.className} text-gray-100 text-lg pt-2`}>
            GPT Allowed!
          </h5>
          <p className={`${PoppinsLight.className} text-gray-400 text-base`}>
            We allow gpt generated texts when they are marked. We know theres no
            way to stop you.
          </p>
        </div>
        <div className="w-72 h-56  rounded-md flex flex-col justify-end p-4">
          <p className="text-4xl ">💻</p>
          <h5 className={`${PoppinsSemi.className} text-gray-100 text-lg pt-2`}>
            On Page Editor!
          </h5>
          <p className={`${PoppinsLight.className} text-gray-400 text-base`}>
            We offer a great on page editor so you can directly write your texts
            on the fly.
          </p>
        </div>
        <div className="w-72 h-56  rounded-md flex flex-col justify-end p-4">
          <p className="text-4xl ">🔥</p>
          <h5 className={`${PoppinsSemi.className} text-gray-100 text-lg pt-2`}>
            Earn Reputation!
          </h5>
          <p className={`${PoppinsLight.className} text-gray-400 text-base`}>
            You wrote a cool text? The community will support you with
            reputation in form of flames.
          </p>
        </div>
      </div>
      <LottiePlayer
        src="https://assets6.lottiefiles.com/packages/lf20_atampd9z.json"
        classes="w-[400px] h-[400px]"
        autoplay
        loop
      />
    </div>
  );
}
