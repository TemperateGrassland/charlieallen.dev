/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    trailingSlash: true, // helps static hosting (optional but often smoother)
  },
};

export default nextConfig;
