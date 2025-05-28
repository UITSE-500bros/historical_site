import React from "react";
import ScrollToTop from "@/components/ScrollToTop";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <ScrollToTop />
      {children}
    </div>
  );
}
