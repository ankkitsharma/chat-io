/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // <--- Add this:
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
