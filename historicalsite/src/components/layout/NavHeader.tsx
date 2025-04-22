"use client";
import * as React from "react";
import { NavLogo } from "./NavLogo";
import { NavMenu } from "./NavMenu";

export default function NavHeader() {
  return (
    <header className="px-16 text-base leading-loose uppercase max-md:px-5">
      <nav className="flex flex-wrap justify-between items-center py-5 w-full max-md:max-w-full">
        <NavLogo />
        <div className="flex flex-wrap gap-6 justify-end self-stretch pl-44 my-auto min-w-60 w-[1220px] max-md:max-w-full">
          <NavMenu />
          <button className="gap-1 self-stretch px-8 py-5 my-auto text-center bg-stone-900 min-h-12 text-stone-50 max-md:px-5">
            Đăng nhập
          </button>
        </div>
      </nav>
    </header>
  );
}
