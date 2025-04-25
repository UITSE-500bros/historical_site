import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import React from "react";

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

      <Tabs className="w-full mt-[80px] flex-col px-8 justify-center">
        <TabsList className="flex gap-4 flex-wrap justify-center items-center">
          <TabsTrigger value ="people" className="text-[color:var(--Black,#1F1F1F)] [leading-trim:both] [text-edge:cap] [font-family:Actor] text-base font-normal leading-[26px] uppercase"> Nhân vật tiêu biểu</TabsTrigger>
          <TabsTrigger value ="event" className="text-[color:var(--Black,#1F1F1F)] [leading-trim:both] [text-edge:cap] [font-family:Actor] text-base font-normal leading-[26px] uppercase"> Sự kiện lịch sử</TabsTrigger>

        </TabsList>
        <TabsContent value="people">
          a
          </TabsContent>
        <TabsContent value="event">
          b
          </TabsContent>
      </Tabs>


    </div>
  );
}
