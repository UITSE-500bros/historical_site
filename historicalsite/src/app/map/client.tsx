"use client";

import { useSearchParams } from "next/navigation";

export function MapClient() {
  const searchParams = useSearchParams();

  const topicRaw = searchParams.get("topic") || "default-topic";
  const periodRaw = searchParams.get("period") || "default-period";
  const topic = topicRaw.toLowerCase().replace(/\s+/g, "");
  const period = periodRaw.toLowerCase().replace(/\s+/g, "");
  const iframeSrc = `https://uploads.knightlab.com/storymapjs/52f7a0c6c1e675dbfdfaa167a3485e49/${topic}in${period}/index.html`;
  console.log(iframeSrc);

  return (
    <div className="w-full h-[800px]">
      <iframe
        src={iframeSrc}
        frameBorder="0"
        width="100%"
        height="800"
      ></iframe>
    </div>
  );
}
