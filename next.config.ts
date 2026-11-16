import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  devIndicators: false,
  async redirects() {
    return [
      { source: "/blog", destination: "/resources", permanent: true },
      { source: "/blog/:slug", destination: "/resources/:slug", permanent: true },
      { source: "/help", destination: "/help-centre", permanent: true },
      { source: "/help/:slug", destination: "/help-centre/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
