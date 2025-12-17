import type { NextConfig } from 'next';

// Allow specifying additional dev origins via env var, comma separated.
const allowedFromEnv = (process.env.ALLOWED_DEV_ORIGINS || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // Allow accessing the dev server from other devices on the network.
    // Add your LAN origin(s) via ALLOWED_DEV_ORIGINS env if needed.
    allowedDevOrigins: [
      'http://localhost:9002',
      'http://127.0.0.1:9002',
      ...allowedFromEnv,
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
