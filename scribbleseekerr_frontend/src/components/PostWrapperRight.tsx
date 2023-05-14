import React from "react";

export default function PostWrapperRight({ children }: { children?: any }) {
  return <div className="h-full w-1/2 flex flex-col gap-4">{children}</div>;
}
