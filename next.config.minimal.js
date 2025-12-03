/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Disable Amplify integration for now
  experimental: {
    outputFileTracingRoot: undefined,
  }
}

module.exports = nextConfig