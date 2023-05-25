import Link from "next/link";
import React from "react";

export default function InitialsAvatar({
  username,
  href,
}: {
  username: string;
  href: string;
}) {
  const createInitials = (name: string) => name.substring(0, 3);
  return (
    <Link
      href={href}
      className="h-12 w-12 min-w-[48px] min-h-[48px] rounded-full bg-gradient-to-br from-violet-500 to-blue-900 text-white grid place-content-center"
    >
      {createInitials(username)}
    </Link>
  );
}
