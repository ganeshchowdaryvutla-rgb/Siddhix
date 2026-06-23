import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'siddhix.vercel.app',
          },
        ],
        destination: 'https://siddhix.online/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
