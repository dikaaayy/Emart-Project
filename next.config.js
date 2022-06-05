/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    domains: [
      "lh3.googleusercontent.com",
      "firebasestorage.googleapis.com",
      "www.w3.org",
    ],
  },
  swcMinify: false,
};

module.exports = nextConfig;
