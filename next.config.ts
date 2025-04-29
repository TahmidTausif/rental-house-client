import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    domains: ["img.freepik.com",
      "media.istockphoto.com",
      "templates.hibootstrap.com",
      "imgbb.com",
      "res.cloudinary.com"
    ],
  },
  
};

export default nextConfig;
// const nextConfig: NextConfig = {
//   images: {

//     domains: [
//       "img.freepik.com",
//       "media.istockphoto.com",
//       "templates.hibootstrap.com",

//     ],
//   },