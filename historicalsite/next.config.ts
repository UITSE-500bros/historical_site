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
};

export default nextConfig;
