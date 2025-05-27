import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";

interface ProfileCardProps {
  name: string;
  content: string;
  image: string;
}

export default function ProfileCard({
  name,
  content,
  image,
}: ProfileCardProps) {
  return (
    <div className="flex flex-col items-center gap-7 flex-[1_0_0] self-stretch [background:var(--Background,#FFFEF8)] px-4 py-9">
      <Avatar>
        <AvatarImage src={image} alt="Avatar" />
        <AvatarFallback>Image</AvatarFallback>
      </Avatar>{" "}
      <div className="flex flex-col items-center gap-2">
        <h1 className="self-stretch text-[color:var(--Black,#1F1F1F)] [leading-trim:both] [text-edge:cap] [font-family:Actor] text-2xl font-normal leading-[normal]">
          {name}
        </h1>
        <p className="self-stretch text-[color:var(--Dark-Grey,#484848)] [leading-trim:both] [text-edge:cap] [font-family:Actor] text-base font-normal leading-[22px]">
          {content}
        </p>
      </div>
    </div>
  );
}
