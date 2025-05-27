import React from "react";
import Image from "next/image";

export default function Events() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center px-14">
      <div
        className=" w-[500px] h-[200px] items-center justify-center flex 
border-2  rounded-full"
      >
        <h1 className="text-[color:var(--Black,#1F1F1F)] text-center [leading-trim:both] [text-edge:cap] [font-family:Actor] text-[64px] font-normal leading-[44px] tracking-[-3.2px] uppercase">
          Sự Kiện
        </h1>
      </div>
      <div className="self-stretch inline-flex flex-col justify-start items-start my-15 gap-4">
        <div className="text-center justify-start text-stone-900 text-6xl font-normal font-['Actor'] uppercase leading-10">
          sự kiện tiêu biểu
        </div>
      </div>{" "}
      <div className="w-full flex flex-row h-[800px] gap-4 items-center justify-center">
        <div className="w-1/2 flex flex-col ">
          <Image
            src="/home/image 15.png"
            alt="Mona Lisa"
            width={500}
            height={400}
          />
        </div>
        <div className="w-1/2 flex flex-col items-start justify-start">
          <h1 className="text-4xl font-bold">Chi tiết</h1>
          <p className="text-lg mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            ullamcorper, nunc et bibendum facilisis, nunc nisi aliquet nunc,
            eget aliquam nisl nunc eget nunc.Duis magna occaecat nostrud sint
            labore elit labore. Ad fugiat minim voluptate proident veniam
            commodo deserunt irure excepteur aliquip pariatur voluptate. Sunt
            incididunt pariatur aliquip ut nulla eu. Laborum ut amet cupidatat
            aliqua veniam non do in. In ad deserunt ut excepteur deserunt
            voluptate labore ut aute consequat laboris anim cupidatat.
          </p>
        </div>
      </div>
    </div>
  );
}
