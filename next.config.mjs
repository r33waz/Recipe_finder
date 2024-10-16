import { withNextVideo } from "next-video/process";
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["localhost", "www.themealdb.com"],
        unoptimized: true,
      },
};

export default withNextVideo(nextConfig);