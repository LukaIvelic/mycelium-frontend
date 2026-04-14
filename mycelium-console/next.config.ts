import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/console",
  async redirects() {
    return [
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
