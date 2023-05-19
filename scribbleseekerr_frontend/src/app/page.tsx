"use client";

import { useGoogleLogin } from "@react-oauth/google";
import Link from "next/link";
import { useState } from "react";

import LandingNav from "@/components/LandingNav";
import MainContent from "@/components/MainContent";
import AboutFeatures from "@/components/AboutFeatures";
import TextSamples from "@/components/TextSamples";
import { useAuth } from "./providers/auth";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-[#0e0e0e] overflow-y-scroll h-screen w-full">
      <LandingNav />
      <div className="text-gray-100  h-96 flex flex-col items-center  mt-32 xl:mt-48">
        <MainContent />
        <AboutFeatures />
        <TextSamples />
        <Footer />
      </div>
    </main>
  );
}
