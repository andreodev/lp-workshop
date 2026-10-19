import type { NextConfig } from 'next';

const config: NextConfig = {
  output: 'export',
  // Static hosting serves the optimized brand assets without an image server.
  images: { unoptimized: true },
};

export default config;
