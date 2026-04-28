/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nejqldosolbhwdhkpyci.supabase.co",
      },
    ],
  },
};

export default nextConfig;