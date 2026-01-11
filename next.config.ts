/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "export",
  trailingSlash: true, // helps static hosting (optional but often smoother)
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
