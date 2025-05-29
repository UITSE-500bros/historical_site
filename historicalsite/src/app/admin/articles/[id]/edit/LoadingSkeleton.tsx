import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function LoadingSkeleton() {
  return (
    <div className="min-h-screen p-5 mt-5 flex flex-col">
      {/* Top metadata section skeleton */}
      <div className="flex items-center justify-between border-b bg-white px-8 py-4 shadow-sm mb-8">
        <div className="flex gap-4 items-center">
          <Skeleton className="h-10 w-72" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-20" />
        </div>
      </div>
      {/* Main 2-column layout skeleton */}
      <div className="flex-1 flex w-full max-w-[1600px] mx-auto py-8 gap-8">
        {/* Left: Content tree skeleton */}
        <aside className="w-1/3 min-w-[260px] max-w-[400px] bg-white border rounded-lg shadow-sm p-4 flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-8 w-16" />
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-5/6" />
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-6 w-1/2" />
          </div>
        </aside>
        {/* Right: Section editor skeleton */}
        <section className="flex-1 bg-white border rounded-lg shadow-sm p-6 flex flex-col min-w-0">
          <div className="flex gap-4 items-center mb-4">
            <Skeleton className="h-10 w-2/3" />
            <Skeleton className="h-10 w-24" />
          </div>
          <div className="flex-1 flex flex-col gap-4 min-h-[300px]">
            <Skeleton className="h-40 w-full mb-4" />
            {/* Gallery skeleton */}
            <div className="flex flex-wrap gap-4">
              <Skeleton className="h-40 w-40" />
              <Skeleton className="h-40 w-40" />
              <Skeleton className="h-40 w-40" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
