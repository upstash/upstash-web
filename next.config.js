const { withContentlayer } = require("next-contentlayer");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withContentlayer(
  withBundleAnalyzer({
    swcMinify: true,
    compiler: {
      removeConsole:
        process.env.NODE_ENV === "development"
          ? false
          : {
              exclude: ["error"],
            },
    },
  })
);
