/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false
  },
  // Enable instrumentation to patch fetch for Netlify compatibility
  experimental: {
    instrumentationHook: true
  }
};

export default nextConfig;
