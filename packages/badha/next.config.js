module.exports = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  env: {
    CDN_URL: "https://bucket-next.s3.ap-southeast-1.amazonaws.com",
    // API_URL: "https://api.badha.io",
    // NEXTAUTH_URL: "https://badha.io",
    NEXTAUTH_URL: "http://localhost:8000",
    API_URL: "http://localhost:8000",
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};
