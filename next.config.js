/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/announcement",
        permanent: true,
      },
    ];
  },
  experimental: {
    esmExternals: "loose", // required to make Konva & react-konva work
  },
  webpack: (config) => {
    config.externals = [...config.externals, { canvas: "canvas" }];  // required to make Konva & react-konva work
    return config;
  },
  // webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
  //   config.module.rules.push({
  //     test: /canvas\.node$/,
  //     use: "binary-loader",
  //   });

  //   return config;
  // },
};

module.exports = nextConfig;
