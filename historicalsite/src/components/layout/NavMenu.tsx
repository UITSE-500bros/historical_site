import * as React from "react";
import { MenuItem } from "./MenuItem";

export const NavMenu: React.FC = () => {
  const menuItems = [
    { label: "HOME", url: "/" },
    { label: "ABOUT", url: "/about" },
    { label: "EXPLORE", url: "/explore" },
    { label: "ADMIN", url: "/admin" },
  ];
  return (
    <div className="flex gap-6 items-center self-stretch my-auto min-w-60 text-stone-900">
      {menuItems.map((item, index) => (
        <MenuItem key={index} label={item.label} url={item.url} />
      ))}
    </div>
  );
};
