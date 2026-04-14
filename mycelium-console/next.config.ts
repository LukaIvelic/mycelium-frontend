import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/console",
  async redirects() {
    return [
      {
        source: '/api/auth/:path*',
        destination: '/console/api/auth/:path*',
        basePath: false,
        permanent: false,
      },
      {
        source: '/',
        destination: '/console',
        basePath: false,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
