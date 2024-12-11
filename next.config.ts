import type { NextConfig } from "next";

const basePath = "";

const nextConfig: NextConfig = {
  basePath,
  env: {
    BASE_PATH: basePath,
  },
};

export default nextConfig;
