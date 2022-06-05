/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    domains: ["lh3.googleusercontent.com", "firebasestorage.googleapis.com"],
  },
  swcMinify: false,
};

module.exports = nextConfig;
