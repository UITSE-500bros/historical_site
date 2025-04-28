import React from 'react'
import { content1, title1 } from './content'

export default function About() {
  return (
    <div className='flex flex-col min-h-screen items-center justify-center'>
      <div
        className=" w-[500px] h-[200px] items-center justify-center flex 
      border-2  rounded-full"
      >
        <h1 className="text-[color:var(--Black,#1F1F1F)] text-center [leading-trim:both] [text-edge:cap] [font-family:Actor] text-[64px] font-normal leading-[44px] tracking-[-3.2px] uppercase">
         Giới thiệu
        </h1>
      </div>

      <div className='grid grid-cols-2  '>
        <h1 className='self-stretch text-[color:var(--Black,#1F1F1F)] [leading-trim:both] [text-edge:cap] [font-family:Actor] text-[64px] font-normal leading-[44px] tracking-[-3.2px] uppercase'>
            {title1}
        </h1>
        <p className='self-stretch text-[color:var(--Black,#1F1F1F)] [leading-trim:both] [text-edge:cap] [font-family:Actor] text-base font-normal leading-[30px]'>
            {content1}
        </p>

      </div>
    </div>
  )
}
