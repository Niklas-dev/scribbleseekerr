import React from "react";
import LottiePlayer from "./LottiePlayer";
import { PoppinsBold, PoppinsLight, PoppinsSemi } from "@/styles/fonts";

export default function TextSamples() {
  return (
    <div className="mt-24 pb-20 flex flex-col items-center">
      <h3
        className={`${PoppinsBold.className} text-gray-100 text-2xl  lg:text-3xl xl:text-4xl text-center h-fit rounded-full px-8 pt-4 w-fit xl:w-[65rem]`}
      >
        You already want to start? No Problem, some reading samples will help!
      </h3>
      <div className="grid grid-cols-1 justify-center lg:grid-cols-2  gap-2 pt-20 h-fit px-4 w-full">
        <div className="w-fit xl:w-[35rem] h-fit  rounded-md flex flex-col  justify-end p-4 bg-[#161616]">
          <p className="text-4xl ">🐕</p>
          <h5 className={`${PoppinsSemi.className} text-gray-100 text-lg pt-2`}>
            An Officer&apos;s Dog (Story)
          </h5>
          <p className={`${PoppinsLight.className} text-gray-400 text-base`}>
            Max was not just any dog. He was a Belgian Malinois, a breed known
            for their high intelligence and excellent working abilities. His
            human family was a team of K-9 officers, who trained him to be a
            police dog. One day, Max was on a mission with his handler, Officer
            Johnson. They were tracking a dangerous criminal who had fled into
            the woods. As they followed the scent, Max caught a whiff of
            something else - a familiar scent from his past. It was the scent of
            his previous owner, who had abandoned him when he was just a puppy.
            Max had always wondered about his past, and now, he was determined
            to follow the scent and find out more. Despite Officer
            Johnson&apos;s commands, Max veered off the trail and followed the
            scent. It led him to an abandoned cabin, where he found a frail and
            elderly man. The man was barely conscious, and Max could sense that
            he was in grave danger. Max barked loudly to get Officer
            Johnson&apos;s attention. The officer followed the sound and found
            Max standing guard over the man. Together, they were able to get the
            man to safety and call for medical attention. As it turned out, the
            man was a retired K-9 officer who had been missing for weeks. He had
            trained Max when he was a puppy and had left the force under
            mysterious circumstances. Max had never forgotten the scent of his
            first owner, and his instincts had led him to save the man&apos;s
            life. From that day forward, Max and Officer Johnson became even
            closer. They knew that Max&apos;s bravery had saved not just the
            retired officer&apos;s life but also helped catch the dangerous
            criminal they had been tracking. Max&apos;s past had caught up with
            him, but it had only made him a better police dog and a more loyal
            companion.
          </p>
        </div>
        <div className="w-fit h-fit  rounded-md flex flex-col justify-end p-4 bg-[#161616]">
          <p className="text-4xl ">😶</p>
          <h5 className={`${PoppinsSemi.className} text-gray-100 text-lg pt-2`}>
            A Moment of Stillness (Poem)
          </h5>
          <p className={`${PoppinsLight.className} text-gray-400 text-base`}>
            In the hustle and bustle of life,
            <br />
            We forget to take a breath,
            <br />
            To pause for a moment of stillness,
            <br />
            And forget about the rest.
            <br />
            <br />
            The world moves at such a pace,
            <br />
            We can&apos;t keep up with it all,
            <br />
            But in a moment of stillness,
            <br />
            We can hear the earth&apos;s sweet call.
            <br />
            <br />
            The rustling of the leaves,
            <br />
            The chirping of the birds,
            <br />
            The soft breeze on our skin,
            <br />
            Reminding us of our worth.
            <br />
            <br />
            In a moment of stillness,
            <br />
            We can find our inner peace,
            <br />
            And realize that in this life,
            <br />
            There is no need to cease.
            <br />
            <br />
            So take a deep breath in,
            <br />
            And let it out with a sigh,
            <br />
            For in this moment of stillness,
            <br />
            We can let our spirits fly.
            <br />
          </p>
        </div>
        <div className="w-fit xl:w-[35rem] h-fit  rounded-md flex flex-col justify-end p-4 bg-[#161616]">
          <p className="text-4xl ">🌲</p>
          <h5 className={`${PoppinsSemi.className} text-gray-100 text-lg pt-2`}>
            Climate Change (Info Paper)
          </h5>
          <p className={`${PoppinsLight.className} text-gray-400 text-base`}>
            Climate change is a complex and multifaceted issue that is caused by
            human activities such as burning fossil fuels, deforestation, and
            agriculture. These activities lead to the buildup of greenhouse
            gases in the atmosphere, primarily carbon dioxide, methane, and
            nitrous oxide. These gases trap heat from the sun and prevent it
            from escaping back into space, causing global temperatures to rise.
            The effects of climate change are widespread and have the potential
            to impact every aspect of life on Earth. Rising sea levels due to
            melting glaciers and polar ice caps can cause flooding and erosion
            of coastlines, threatening homes and businesses. More frequent and
            severe weather events, such as hurricanes, droughts, and wildfires,
            can damage crops and infrastructure, leading to economic losses.
            Climate change also has an impact on ecosystems and biodiversity,
            with many species at risk of extinction due to changes in
            temperature and habitat loss. It is important to take action to
            mitigate the effects of climate change and protect our planet for
            future generations. One of the most important solutions is to reduce
            greenhouse gas emissions through the use of renewable energy sources
            such as wind and solar power. Governments and businesses can also
            invest in energy-efficient technologies and transportation systems
            to reduce their carbon footprint. Additionally, reforestation and
            other nature-based solutions can help sequester carbon from the
            atmosphere and protect ecosystems and biodiversity. In conclusion,
            climate change is a complex and pressing issue that requires action
            from individuals, governments, and businesses around the world. By
            understanding the causes and effects of climate change and
            implementing solutions to mitigate its impact, we can protect our
            planet and ensure a sustainable future for generations to come.
          </p>
        </div>
        <div className="w-72 h-fit  rounded-md flex flex-col justify-end p-4 bg-[#161616]">
          <p className="text-4xl ">🕳️</p>
          <h5 className={`${PoppinsSemi.className} text-gray-100 text-lg pt-2`}>
            The Depths (Poem)
          </h5>
          <p className={`${PoppinsLight.className} text-gray-400 text-base`}>
            In the depths of my mind,
            <br />
            Lies a darkness so deep,
            <br />
            A place where my fears,
            <br />
            And my secrets do keep.
            <br />
            <br />
            It whispers to me,
            <br />
            In the dead of the night,
            <br />
            With a voice so cold,
            <br />
            And a touch so light.
            <br />
            <br />
            It tells me of things,
            <br />
            That I dare not speak,
            <br />
            Of the sins that I&apos;ve done,
            <br />
            And the wounds that won&apos;t heal.
            <br />
            <br />
            In the depths of my mind,
            <br />
            The darkness does reign,
            <br />
            And I fear that one day,
            <br />
            It will drive me insane.
            <br />
            <br />
            For the darkness is a beast,
            <br />
            That devours my soul,
            <br />
            And it&apos;s grip is so tight,
            <br />
            That I cannot let go.
            <br />
            <br />
            So I live in the shadows,
            <br />
            Of my own twisted mind,
            <br />
            Forever haunted,
            <br />
            By the darkness I find.
            <br />
          </p>
        </div>
      </div>
      <LottiePlayer
        src="https://assets9.lottiefiles.com/private_files/lf30_DoHdiF.json"
        classes="w-[400px] h-[400px]"
        autoplay
        loop
      />
    </div>
  );
}
