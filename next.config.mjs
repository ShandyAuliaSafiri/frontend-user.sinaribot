/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4444',
        pathname: '/uploads/**',
      },
    ],
  },
}

export default nextConfig