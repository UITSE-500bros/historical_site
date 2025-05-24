// import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";
import Image from "next/image";
interface MapCardProps {
  topic: string;
  image: string;
  period: string;
}

export default function MapCard({
 topic,
  image,
  period,
}: MapCardProps) {
 return (
  <div className="relative transition-transform duration-300 hover:scale-[1.02]">
    <a
      aria-label={topic}
      // href={`/map/${topic.replace(/\s+/g, "-")}${period}`}
      href={`/map?topic=${encodeURIComponent(topic)}&period=${encodeURIComponent(period)}`}
    >
      <figure
        className="relative overflow-hidden"
        style={{ height: "200px", borderRadius: "10px" }}
      >
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 transition-opacity duration-300 hover:opacity-70" />

        {/* Ảnh chính */}
        <Image
          src={image}
          alt={topic}
          fill
          className="object-cover rounded-[10px] z-0 transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />

        {/* Tiêu đề ảnh */}
        <h2 className="absolute bottom-3 left-3 z-20 text-white text-lg font-semibold transition-all duration-300 group-hover:text-yellow-300">
          {topic}
        </h2>
      </figure>
    </a>
  </div>
);

}
