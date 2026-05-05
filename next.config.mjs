/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/acquisition/rates/realestate/housing/:slug', destination: '/acquisition/rates/realestate/housing', permanent: true },
      { source: '/acquisition/rates/realestate/farmland/:slug', destination: '/acquisition/rates/realestate/farmland', permanent: true },
      { source: '/acquisition/rates/realestate/non-farmland/:slug', destination: '/acquisition/rates/realestate/non-farmland', permanent: true },
    ];
  },
};

export default nextConfig;
