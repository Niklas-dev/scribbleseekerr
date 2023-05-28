import { PoppinsSemi } from "@/styles/fonts";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="bg-[#0e0e0e] flex flex-col overflow-y-scroll h-screen w-full px-6  sm:px-28 md:px-32 lg:px-36 xl:px-72 py-10">
      <div className="flex flex-row items-center justify-between  py-8 gap-8 ">
        <Link
          href={"/texts"}
          className={`${PoppinsSemi.className} text-gray-100 text-lg border-2 border-gray-100 rounded-md px-4 py-2 transition-transform duration-300 hover:scale-95`}
        >
          Back
        </Link>
        <h2
          className={`${PoppinsSemi.className} text-gray-100 text-xl lg:text-3xl capitalize`}
        >
          Guidelines
        </h2>

        <div></div>
      </div>
      <div className="mt-20 w-full  py-8 px-8 rounded-lg h-fit flex flex-col gap-2">
        <h3 className={`${PoppinsSemi.className} text-gray-100 text-xl `}>
          Community Guidelines for ScribbleSeekerr Text Posting Platform
        </h3>
        <p className={`${PoppinsSemi.className} text-gray-400 text-lg pt-2`}>
          Welcome to ScribbleSeekerr, the platform where words come alive! To
          ensure a vibrant and harmonious community, we have established the
          following guidelines. By being a part of ScribbleSeekerr, you agree to
          abide by these guidelines:
        </p>
        <ol
          className={`${PoppinsSemi.className} text-gray-400 text-base flex flex-col gap-4 list-decimal pl-10`}
        >
          <li>
            <b className="font-bold text-gray-100">Respect and Kindness:</b>{" "}
            Respect and Kindness: Treat all members of the ScribbleSeekerr
            community with respect and kindness. Engage in constructive
            discussions, and refrain from engaging in personal attacks,
            harassment, or bullying. Embrace diversity and promote inclusivity.
          </li>
          <li>
            <b className="font-bold text-gray-100">Original Content:</b>{" "}
            Original Content: Share only original content that you have created
            or have the right to distribute. Plagiarism and copyright
            infringement are strictly prohibited. If you reference or quote
            someone else&apos;s work, ensure proper attribution is provided.
          </li>
          <li>
            <b className="font-bold text-gray-100">Appropriate Content:</b>{" "}
            Appropriate Content: Ensure that your content is suitable for all
            audiences. Do not post or promote explicit, offensive,
            discriminatory, or illegal material. This includes hate speech,
            adult content, violence, or any form of graphic imagery.
          </li>
          <li>
            <b className="font-bold text-gray-100">Intellectual Property:</b>{" "}
            Intellectual Property: Respect the intellectual property rights of
            others. Do not post content that infringes upon copyrights,
            trademarks, or any other intellectual property laws. If you believe
            your work has been infringed upon, please contact us with relevant
            details.
          </li>
          <li>
            <b className="font-bold text-gray-100">
              No Spamming or Self-Promotion:
            </b>{" "}
            No Spamming or Self-Promotion: Avoid spamming or excessive
            self-promotion. While we encourage sharing your work, refrain from
            repeatedly posting the same content or promoting unrelated products
            or services. Engage genuinely and contribute meaningfully to the
            community.
          </li>
          <li>
            <b className="font-bold text-gray-100">
              Privacy and Personal Information:
            </b>{" "}
            Privacy and Personal Information: Respect the privacy and personal
            information of others. Do not share or solicit private information,
            such as addresses, phone numbers, or financial details. When sharing
            personal experiences or stories, consider anonymizing or
            fictionalizing them, if necessary.
          </li>
          <li>
            <b className="font-bold text-gray-100">Constructive Feedback:</b>{" "}
            Constructive Feedback: Provide constructive feedback to fellow
            ScribbleSeekerr users when requested. Aim to offer helpful
            suggestions, constructive criticism, and encouragement to foster
            growth and improvement. Avoid malicious or unhelpful comments that
            may discourage or harm others.
          </li>
          <li>
            <b className="font-bold text-gray-100">Reporting and Flagging:</b>{" "}
            Reporting and Flagging: If you come across content that violates
            these guidelines, please report it to the ScribbleSeekerr
            administrators using the designated reporting feature. Your
            vigilance helps us maintain a safe and enriching environment for
            everyone.
          </li>
          <li>
            <b className="font-bold text-gray-100">
              Compliance with Laws and Regulations:
            </b>{" "}
            Ensure that your content adheres to all applicable laws and
            regulations. Do not engage in activities that are illegal, harmful,
            or deceptive. Respect the rights and safety of others within the
            legal boundaries.
          </li>
          <li>
            <b className="font-bold text-gray-100">Platform-Specific Rules:</b>{" "}
            Familiarize yourself with any additional platform-specific rules or
            guidelines provided by ScribbleSeekerr administrators. These may
            include specific formatting requirements, word limits, or content
            categories.
          </li>
        </ol>
        <p className={`${PoppinsSemi.className} text-gray-400 text-base `}>
          Failure to comply with these guidelines may result in warnings,
          content removal, temporary or permanent suspension of your
          ScribbleSeekerr account, or other appropriate actions, as determined
          by the platform administrators.
        </p>
        <p className={`${PoppinsSemi.className} text-gray-400 text-base`}>
          Let&apos;s nurture a vibrant and supportive community of writers on
          ScribbleSeekerr. Unleash your creativity, share your stories, and
          inspire others with your words. Happy writing,{" "}
          <b className="font-bold text-gray-100">Scribblers</b>!
        </p>
      </div>
    </div>
  );
}
