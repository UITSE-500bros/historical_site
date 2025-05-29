import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["cdn.britannica.com", "plbumhpcbkczyavtlrec.supabase.co"],
    // Or if you're using the newer remotePatterns (recommended):
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.britannica.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "plbumhpcbkczyavtlrec.supabase.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
  env: {
    API_BASE_URL: process.env.API_BASE_URL || 'http://backend:8888',
  },
  
  // This setting allows Next.js to build without requiring the API to be available
  experimental: {
    // Configure static generation settings
    staticGenerationRetryCount: 3
  },
  
  // Disable static generation for pages that fetch data
  output: 'standalone',
};

export default nextConfig;
