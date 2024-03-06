/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        hostname: "192.168.3.124",
        pathname: "**",
        port: "3000",
        protocol: "http",
      },
      {
        hostname: "inmove-blog.oss-cn-hangzhou.aliyuncs.com",
        pathname: "**",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
