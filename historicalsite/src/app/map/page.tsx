import React, { Suspense } from "react";
import { MapClient } from "./client";

function MapFallback() {
  return (
    <div className="w-full h-[800px] flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="h-16 w-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-700">Loading Map</h2>
        <p className="text-gray-500">
          Please wait while we load the interactive map...
        </p>
      </div>
    </div>
  );
}

export default function Map() {
  return (
    <Suspense fallback={<MapFallback />}>
      <MapClient />
    </Suspense>
  );
}
