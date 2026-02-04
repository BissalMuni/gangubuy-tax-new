import createMDX from '@next/mdx';

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  async redirects() {
    return [
      // Redirects for merged housing pages
      { source: '/acquisition/rates/realestate/housing/:slug', destination: '/acquisition/rates/realestate/housing', permanent: true },
      // Redirects for merged farmland pages
      { source: '/acquisition/rates/realestate/farmland/:slug', destination: '/acquisition/rates/realestate/farmland', permanent: true },
      // Redirects for merged non-farmland pages
      { source: '/acquisition/rates/realestate/non-farmland/:slug', destination: '/acquisition/rates/realestate/non-farmland', permanent: true },
    ];
  },
};

export default withMDX(nextConfig);
