import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // Allow unoptimized local images that haven't been uploaded yet
    unoptimized: false,
    remotePatterns: [],
    // Fallback for missing images handled in components via onError
  },
  // Vercel-ready — no additional config needed
};

export default nextConfig;
