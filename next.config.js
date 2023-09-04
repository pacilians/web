/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: /canvas\.node$/,
      use: "binary-loader",
    });

    return config;
  },
};

module.exports = nextConfig;
