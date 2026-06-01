/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Vercel's Image Optimization serves avif/webp automatically
    formats: ['image/avif', 'image/webp'],

    remotePatterns: [
      // Placeholder images used during development
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },

      // CONNECT: Uncomment when you add Firebase Storage
      // {
      //   protocol: 'https',
      //   hostname: 'firebasestorage.googleapis.com',
      //   pathname: '/v0/b/**',
      // },

      // CONNECT: Uncomment when you add Supabase Storage
      // {
      //   protocol: 'https',
      //   hostname: '*.supabase.co',
      //   pathname: '/storage/v1/object/public/**',
      // },
    ],
  },

  // Vercel automatically sets NODE_ENV=production on deploy — no extra config needed.
  // Do NOT add `output: 'export'` — the /product/[id] route is dynamically rendered.

  // Strict mode helps catch bugs early
  reactStrictMode: true,
}

module.exports = nextConfig
