import LandingNav from "@/components/LandingNav";
import MainContent from "@/components/MainContent";
import AboutFeatures from "@/components/AboutFeatures";
import TextSamples from "@/components/TextSamples";

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
