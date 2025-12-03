/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use standard output for Amplify hosting with SSR support
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Enable output file tracing for Amplify
  experimental: {
    outputFileTracingRoot: process.cwd(),
  }
}

module.exports = nextConfig