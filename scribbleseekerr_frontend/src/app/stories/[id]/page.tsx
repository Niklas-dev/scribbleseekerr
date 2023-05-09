import React from "react";

export default function page({ params }: { params: any }) {
  return <div>{params.id}</div>;
}
