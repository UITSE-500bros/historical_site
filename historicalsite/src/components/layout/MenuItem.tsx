import Link from "next/link";
import * as React from "react";

interface MenuItemProps {
  label: string;
  url: string;
}

export const MenuItem: React.FC<MenuItemProps> = ({ label,url }) => {
  return (
    <div className="self-stretch pt-3 my-auto">
      <Link href={url}>{label}</Link>
    </div>
  );
};
