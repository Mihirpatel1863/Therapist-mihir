/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'encrypted-tbn0.gstatic.com', // ✅ Add this line
      'images.unsplash.com',
      'hopeandgrowthcenter.com'
    ],
  },
};

module.exports = nextConfig;
