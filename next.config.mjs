/** @type {import('next').NextConfig} */
const nextConfig = {experimental: {
    reactRoot: true,
    concurrentFeatures: true,
    runtime: 'edge', // Add this line
  },};

export default nextConfig;
