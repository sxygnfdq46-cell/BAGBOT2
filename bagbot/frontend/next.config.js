/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // DISABLE standalone so Render gets all assets
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig;
