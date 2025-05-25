"use client";
import * as React from "react";
import { NavMenu } from "./NavMenu";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function NavHeader() {
  const router = useRouter();
  const handleLoginClick = () => {
    router.push("/login");
  };
  return (
    <header className="px-16  z-50 text-base leading-loose uppercase max-md:px-5">
      <nav className="flex flex-wrap justify-between items-center py-5 w-full max-md:max-w-full">
        <div className="flex items-center space-x-3">
          <img
            src="/logo_nobg.png"
            alt="Company Logo"
            className="w-25 object-contain aspect-square rounded-full"
          />
        </div>

        <div className="flex flex-wrap gap-6 justify-end items-center pl-10 flex-1 min-w-60 max-w-full">
          <NavMenu />
          <Button
            onClick={handleLoginClick}
            className="gap-1 px-8 py-3 text-center bg-stone-900 min-h-12 text-stone-50 max-md:px-5"
          >
            Đăng nhập
          </Button>
        </div>
      </nav>
    </header>
  );
}
