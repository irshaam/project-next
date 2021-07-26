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
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};
