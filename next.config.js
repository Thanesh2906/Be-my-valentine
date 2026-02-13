/** @type {import('next').NextConfig} */
const nextConfig = {
  // Generate a fully static export into the `out` directory
  output: 'export',
  images: {
    // Required when using `output: 'export'` with the App Router
    unoptimized: true
  },
  // If you deploy to GitHub Pages under /Be-my-valentine, uncomment these:
  basePath: '/Be-my-valentine',
  assetPrefix: '/Be-my-valentine/'
};

module.exports = nextConfig;

