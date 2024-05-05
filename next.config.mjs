/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: "/proxy/cms/:path*",
        destination: `${process.env.NEXT_PUBLIC_API}/:path*`,
      },
    ];
  },
};

export default nextConfig;
