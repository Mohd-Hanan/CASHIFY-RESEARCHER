import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors. Vercel is failing on a config bug in Next 15.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
