import { SNBT_URL } from "@/const";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/deadline.js',
        destination: '/api/deadlinejs',
      },
      {
        source: '/data/:path*',
        destination: '/api/data?p=:path*'
      },
      {
        source: '/:path*',
        destination: new URL('./:path*', SNBT_URL).href,
      },
    ];
  },
  poweredByHeader: true,
  async redirects() {
    return [
      {
        source: '/github',
        destination: 'https://github.com/hansputera/snbt-mirror.git',
        statusCode: 301,
      },
    ];
  },
  generateEtags: true,
};

export default nextConfig;
