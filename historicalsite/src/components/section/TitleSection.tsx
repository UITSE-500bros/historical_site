import React from "react";

export default function TitleSection({ title }: { title: string }) {
  return (
    <div className=" px-8 flex justify-between items-center self-stretch h-[200px] ">
      {/* Left Section */}
      <div className=" flex justify-center items-center  w-[446px] h-[170px] shrink-0 border border-[color:var(--Black,#1F1F1F)] rounded-full border-solid">
        <p className="text-[color:var(--Black,#1F1F1F)] text-center [leading-trim:both] [text-edge:cap] [font-family:Actor] text-[64px] font-normal leading-[44px] tracking-[-3.2px] uppercase">
          {title}
        </p>
      </div>

      {/* Right Section */}
      <div className="flex justify-center items-center w-[200px] h-[50px] shrink-0  rounded-full bg-transparent cursor-pointer">
        <a className="text-[color:var(--Black,#1F1F1F)] text-center [font-family:Actor] text-[20px] font-normal leading-[24px] tracking-[-1px] uppercase">
          Tìm Hiểu Thêm
        </a>
      </div>
    </div>
  );
}
