import React from "react";
import { Peoples } from "./people";
import ProfileCard from "@/src/components/cards/ProfileCard";
import Link from "next/link";
import { MyPagination } from "@/src/components/section/MyPagination";

export default function Explore() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <div
        className=" w-[500px] h-[200px] items-center justify-center flex 
      border-2  rounded-full"
      >
        <h1 className="text-[color:var(--Black,#1F1F1F)] text-center [leading-trim:both] [text-edge:cap] [font-family:Actor] text-[64px] font-normal leading-[44px] tracking-[-3.2px] uppercase">
          Khám Phá
        </h1>
      </div>

      <div className="w-full mt-[80px] px-8">
        <div className="grid grid-cols-3 gap-4">
          {Peoples.slice(0, 9).map((person, index) => (
            <Link href={`/explore/${person.name}`} key={index}>
              <ProfileCard
                name={person.name}
                content={person.content}
                image={person.image}
              />
            </Link>
          ))}
        </div>
      </div>

      <MyPagination />
    </div>
  );
}
