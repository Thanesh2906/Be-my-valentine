/** @type {import('next').NextConfig} */
const nextConfig = {
  // Generate a fully static export into the `out` directory
  output: 'export',
  images: {
    // Required when using `output: 'export'` with the App Router
    unoptimized: true
  }
};

module.exports = nextConfig;

