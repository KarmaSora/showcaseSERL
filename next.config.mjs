const nextBasePath = process.env.NEXT_BASE_PATH || ''

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: nextBasePath,
  images: {
    unoptimized: true,
  },
}

export default nextConfig
