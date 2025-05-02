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
        source: "/apiv1/:path*",
        destination: "http://localhost:4000/apiv1/:path*", // Proxy to Backend
      },
    ];
  },
};

export default nextConfig;
