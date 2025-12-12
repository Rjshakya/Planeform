import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    remotePatterns: [new URL("https://bucket.planetform.xyz/**")],
  },
};


initOpenNextCloudflareForDev();
export default nextConfig;
