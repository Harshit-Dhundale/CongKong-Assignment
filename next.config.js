/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["pasdghqniqoxqlbzunoc.supabase.co"],
    unoptimized: true,
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "pasdghqniqoxqlbzunoc.supabase.co"],
    },
  },
}

module.exports = nextConfig
