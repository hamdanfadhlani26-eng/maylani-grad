/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow local /public/photos folder — Next.js handles these automatically
    // Add external domains here if needed in future
    remotePatterns: [],
  },
};

export default nextConfig;
