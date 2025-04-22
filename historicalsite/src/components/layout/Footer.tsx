import React from "react";

export default function Footer() {
  return (
    <div className="px-16 py-28 bg-stone-900 inline-flex flex-col justify-start items-center w-full">
      {/* Main content wrapper */}
      <div className="w-[1312px] inline-flex justify-center items-start">
        <div className="flex-1 self-stretch inline-flex flex-col justify-center items-start gap-8">
          {/* Top section: Logo and navigation links */}
          <div className="self-stretch pb-10 inline-flex justify-start items-start gap-20">
            {/* Logo section */}
            <div className="w-96 self-stretch inline-flex flex-col justify-start items-start gap-6">
              <img
                className="w-64 h-48"
                src="https://placehold.co/258x200"
                alt="Logo"
              />
            </div>

            {/* Navigation links */}
            <div className="flex-1 flex justify-between items-start">
              {/* Navigation column */}
              <div className="w-36 inline-flex flex-col justify-start items-start gap-8">
                <div className="self-stretch flex flex-col justify-start items-start gap-6">
                  <div className="self-stretch flex flex-col justify-start items-start gap-7">
                    {/* Individual navigation links */}
                    <div className="self-stretch justify-center text-stone-50 text-xl font-normal font-['Actor'] leading-7">
                      TRANG CHỦ
                    </div>
                    <div className="self-stretch justify-center text-stone-50 text-xl font-normal font-['Actor'] leading-7">
                      GIỚI THIỆU
                    </div>
                    <div className="self-stretch justify-center text-stone-50 text-xl font-normal font-['Actor'] leading-7">
                      KHÁM PHÁ
                    </div>
                    <div className="self-stretch justify-center text-stone-50 text-xl font-normal font-['Actor'] leading-7">
                      SỰ KIỆN
                    </div>
                    <div className="self-stretch justify-center text-stone-50 text-xl font-normal font-['Actor'] leading-7">
                      LIÊN HỆ
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact information */}
              <div className="inline-flex flex-col justify-start items-start gap-6">
                <div className="flex flex-col justify-start items-center gap-6">
                  <div className="self-stretch inline-flex justify-start items-center gap-2">
                    <div className="w-60 justify-center text-stone-50 text-xl font-normal font-['Actor'] leading-7">
                      THÔNG TIN LIÊN HỆ
                    </div>
                  </div>
                  <div className="flex flex-col justify-start items-start gap-4">
                    {/* Address */}
                    <div className="self-stretch inline-flex justify-start items-center gap-3">
                      <div className="w-80 justify-center text-zinc-400 text-base font-normal font-['Actor'] leading-snug">
                        Số 1, phố Hỏa Lò, Hoàn Kiếm, Hà Nội
                      </div>
                    </div>
                    {/* Email */}
                    <div className="self-stretch inline-flex justify-start items-center gap-3">
                      <div className="flex-1 justify-center text-zinc-400 text-base font-normal font-['Actor'] leading-snug">
                        bqldtnthl_sovhtt@hanoi.gov.vn
                      </div>
                    </div>
                    {/* Phone numbers */}
                    <div className="inline-flex justify-start items-center gap-3">
                      <div className="justify-center text-zinc-400 text-base font-normal font-['Actor'] leading-snug">
                        0822446116 | 0825112668
                      </div>
                    </div>
                    <div className="inline-flex justify-start items-center gap-3">
                      <div className="justify-center text-zinc-400 text-base font-normal font-['Actor'] leading-snug">
                        024.39342253 | 024.39342317
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Opening hours */}
              <div className="inline-flex flex-col justify-start items-start gap-6">
                <div className="inline-flex justify-start items-center gap-2">
                  <div className="w-60 justify-center text-stone-50 text-xl font-normal font-['Actor'] leading-7">
                    GIỜ MỞ CỬA
                  </div>
                </div>
                <div className="flex flex-col justify-start items-start gap-4">
                  <div className="self-stretch justify-start text-zinc-400 text-base font-normal font-['Actor'] leading-snug">
                    Thứ 2 - Chủ nhật: 8:00 - 17:00
                  </div>
                  <div className="self-stretch justify-start text-zinc-400 text-base font-normal font-['Actor'] leading-snug">
                    Ngày Lễ, Tết: 8:00 - 17:00
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom section: Copyright and social media */}
          <div className="self-stretch pt-5 border-t border-stone-50 inline-flex justify-between items-start">
            {/* Copyright text */}
            <div className="justify-center text-zinc-400 text-lg font-normal font-['Actor'] leading-relaxed">
              Copyright © 2024 Nhà tù Hỏa Lò
            </div>
            {/* Social media icons */}
            <div className="inline-flex flex-col justify-start items-end gap-2">
              <div className="inline-flex justify-start items-start gap-2">
                {/* Individual social media icons */}
                <div className="w-10 h-10 bg-stone-50 rounded-[50px] inline-flex flex-col justify-center items-center">
                  <div className="w-4 h-4 bg-stone-900" />
                </div>
                <div className="w-10 h-10 bg-stone-50 rounded-[50px] inline-flex flex-col justify-center items-center">
                  <div className="w-4 h-4 bg-stone-900" />
                </div>
                <div className="w-10 h-10 bg-stone-50 rounded-[50px] inline-flex flex-col justify-center items-center">
                  <div
                    data-color="Negative"
                    data-platform="Spotify"
                    className="w-4 h-4 relative bg-stone-50"
                  >
                    <div className="w-4 h-4 left-0 top-0 absolute bg-stone-900" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
