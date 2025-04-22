import * as React from "react";

interface MenuItemProps {
  label: string;
}

export const MenuItem: React.FC<MenuItemProps> = ({ label }) => {
  return (
    <div className="self-stretch pt-3 my-auto">
      <div>{label}</div>
    </div>
  );
};
