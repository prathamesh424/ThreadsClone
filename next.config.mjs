/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverActions: true, // Enables experimental server actions
      serverComponentsExternalPackages: ["mongoose"], // Allows external packages for server components
    },
    eslint: {
      // Warning: This allows production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true, // Ignores ESLint errors during production builds
    },
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "img.clerk.com",
        },
        {
          protocol: "https",
          hostname: "images.clerk.dev",
        },
        {
          protocol: "https",
          hostname: "uploadthing.com",
        },
        {
          protocol: "https",
          hostname: "placehold.co",
        },
      ],
    },
  };
  
  export default nextConfig;
  