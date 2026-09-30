import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Temporary placeholder photography is served from Unsplash.
    // Once real Smile photos are added to /public/images, this can be removed.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        // Leadership portraits and outlet photos get replaced in place
        // (same filename, new bytes) whenever one is updated. Without
        // this, a browser that already cached the old file can keep
        // showing it after the new one is deployed. must-revalidate
        // forces a conditional check against the server on every load —
        // cheap (a 304) when the file hasn't changed, and correct the
        // moment it has.
        source: "/images/:folder(leadership|outlets)/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=0, must-revalidate" }],
      },
      {
        // Same reasoning for the home page hero, which is also swapped in
        // place under a stable filename.
        source: "/images/hero.jpg",
        headers: [{ key: "Cache-Control", value: "public, max-age=0, must-revalidate" }],
      },
    ];
  },
};

export default nextConfig;
