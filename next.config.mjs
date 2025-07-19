// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true, // Optional: Enables React strict mode
    allowedDevOrigins: ["http://192.168.0.162", "http://localhost:3002", "http://192.168.0.162:3002"],
  };
  
  export default nextConfig;
