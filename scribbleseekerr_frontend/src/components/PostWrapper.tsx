import React from "react";

export default function PostWrapper({ children }: { children?: any }) {
  return (
    <div className="h-full w-1/2 min-w-[350px] sm:min-w-[400px] md:min-w-[550px] flex flex-col items-center gap-4 ">
      {children}
    </div>
  );
}
