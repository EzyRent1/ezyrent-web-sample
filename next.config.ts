import type { NextConfig } from 'next';

//This has been handled in the middleware............
// const allowedOrigin =
//   process.env.NODE_ENV === 'production'
//     ? "https://ezyrent-web.vercel.app"
//     : "http://localhost:3000";


const nextConfig: NextConfig = {
  // webpack(config, { dev }) {
  //   if (dev) {
  //     config.devtool = 'eval-source-map'; // for development
  //   }
  //   return config;
  // },
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
          {
        protocol: "https",
        hostname: "miro.medium.com",
        pathname: "**",
      },
    ],
  },
  reactStrictMode: true,
  env: {
    LOCATION_HQTRS_API_KEY: process.env.NEXT_PUBLIC_LOCATION_HQTRS_API_KEY,
    BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Access-Control-Allow-Origin", value: '*' },
          { key: "Access-Control-Allow-Methods", value: "GET, POST, PUT, DELETE, OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization, X-Requested-With" },
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
          { key: "Permissions-Policy", value: "geolocation=(), microphone=(), camera=(), interest-cohort=()" },
        ],
      },
      {
        source: "/api/(.*)",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "OPTIONS, GET, POST, PUT, DELETE" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" },
          { key: "Access-Control-Allow-Credentials", value: "true" },
        ],
      },
    ];
  },

  async rewrites() {
    if (!process.env.NEXT_PUBLIC_BASE_URL) {
      throw new Error("Environment variable NEXT_PUBLIC_BASE_URL is missing");
    }
    
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_BASE_URL}/api/:path*`,
      },
    ];
  },

  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
};

// Validate required environment variables (only during runtime)
if (process.env.NODE_ENV !== 'test') {
  ["NEXT_PUBLIC_LOCATION_HQTRS_API_KEY", "NEXT_PUBLIC_BASE_URL"].forEach((key) => {
    if (!process.env[key]) {
      console.warn(`Warning: Environment variable ${key} is missing.`);
    }
  });
}

export default nextConfig;
