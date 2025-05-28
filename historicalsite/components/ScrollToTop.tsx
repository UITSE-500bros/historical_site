"use client";

import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

interface ScrollToTopProps {
  showAfter?: number; // Show button after scrolling this many pixels
  className?: string;
}

export function ScrollToTop({
  showAfter = 300,
  className = "",
}: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > showAfter) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    // Cleanup function
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, [showAfter]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Button
      onClick={scrollToTop}
      className={`fixed bottom-6 w-10 h-10 right-6 z-50  text-white font-semibold p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl ${className}`}
      size="sm"
      aria-label="Scroll to top"
    >
      <ChevronUp className="h-5 w-5" />
    </Button>
  );
}

export default ScrollToTop;
