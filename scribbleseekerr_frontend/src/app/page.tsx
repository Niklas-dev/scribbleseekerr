import LandingNav from "@/components/LandingNav";
import MainContent from "@/components/MainContent";
import AboutFeatures from "@/components/AboutFeatures";
import TextSamples from "@/components/TextSamples";

import Footer from "@/components/Footer";

export const metadata = {
  title: "ScribbleSeekerr",
  keywords: [
    "ScribbleSeekerr",
    "Texts",
    "Sharing",
    "Poems",
    "Stories",
    "Papers",
  ],
  description:
    "Unleash your creativity and join our community of wordsmiths! Share your stories and poems, or dive into a world of imagination with our endless collection of literary treasures. Welcome to a place where every word matters.",
};
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
