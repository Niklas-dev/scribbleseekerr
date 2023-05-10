import React from "react";

export default function PostWrapperLeft({ children }: { children?: any }) {
  return (
    <div className="h-full w-1/2 flex flex-col items-end gap-2">{children}</div>
  );
}
