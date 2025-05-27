"use client";
import Image from "next/image";
import { NavMenu } from "./NavMenu";

export default function NavHeader() {
  return (
    <header className="px-16   z-50 text-base leading-loose uppercase max-md:px-5">
      <nav className="flex flex-wrap justify-between items-center py-5 w-full max-md:max-w-full">
        {" "}
        <div className="flex items-center space-x-3">
          <Image
            src="/logo_nobg.png"
            alt="Company Logo"
            className="w-25 object-contain aspect-square rounded-full"
            width={100}
            height={100}
          />
        </div>
        <div className="flex flex-wrap gap-6 justify-end items-center pl-10 flex-1 min-w-60 max-w-full">
          <NavMenu />
        </div>
      </nav>
    </header>
  );
}
