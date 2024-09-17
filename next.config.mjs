/** @type {import('next').NextConfig} */
// const withMDX = require('@next/mdx')()

import remarkGfm from "remark-gfm";
import createMDX from "@next/mdx";
import remarkToc from "remark-toc";

const nextConfig = {
  // Configure `pageExtensions` to include MDX fileszz
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // Optionally, add any other Next.js config below
  images: {
    remotePatterns: [
      {
        hostname: "cochincruiseline.com",
        protocol: "https",
      },
      {
        hostname: "drive.google.com",
        protocol: "https",
      },
      {
        hostname: "utfs.io",
        protocol: "https",
      },
    ],
  },
};
const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [remarkGfm, remarkToc],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
