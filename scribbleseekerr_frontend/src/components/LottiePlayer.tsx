"use client";
import { Player } from "@lottiefiles/react-lottie-player";
import React from "react";

export default function LottiePlayer({
  src,
  classes,
  autoplay,
  loop,
}: {
  src: string;
  classes: string;
  autoplay?: boolean;
  loop?: boolean;
}) {
  return <Player className={classes} autoplay loop={loop} src={src}></Player>;
}
