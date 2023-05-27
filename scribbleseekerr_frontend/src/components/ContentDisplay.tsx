import { PoppinsLight } from "@/styles/fonts";
import React from "react";

export default function ContentDisplay({
  content,
  className,
  textcolor,
}: {
  content: string;
  className?: string;
  textcolor?: string;
}) {
  return (
    <p
      className={`${PoppinsLight.className} text-gray-${textcolor} text-base ${className}`}
    >
      {content.split("\n").map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ))}
    </p>
  );
}
