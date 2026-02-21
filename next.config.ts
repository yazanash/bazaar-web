import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // ارفع الحد لـ 10 ميجا أو حسب حاجتك
    },
  },
};

export default nextConfig;
