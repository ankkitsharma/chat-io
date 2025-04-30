/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // <--- Add this:
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:4000/api/:path*", // Proxy to Backend
      },
    ];
  },
};

export default nextConfig;
