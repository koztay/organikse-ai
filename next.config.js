/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,  // This will ignore TS errors during build
  },
  eslint: {
    ignoreDuringBuilds: true,  // This will ignore ESLint errors during build
  }
}

module.exports = nextConfig 