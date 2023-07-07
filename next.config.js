/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = {
      encoding: false,
      bufferutil: false,
      "utf-8-validate": false,
    };
  },
};

module.exports = nextConfig;
