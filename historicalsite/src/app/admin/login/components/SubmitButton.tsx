"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SubmitButtonProps {
  isLoading: boolean;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function SubmitButton({
  isLoading,
  disabled,
  className,
  children,
}: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      disabled={isLoading || disabled}
      className={cn(
        "w-full bg-blue-600 hover:bg-blue-700 transition-colors duration-200",
        className
      )}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Đang đăng nhập...
        </>
      ) : (
        children
      )}
    </Button>
  );
}
