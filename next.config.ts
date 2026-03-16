import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lgdpi3itilqd9qe9.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;