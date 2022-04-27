const { withContentlayer } = require("next-contentlayer");
const withPWA = require("next-pwa");

const isDev = process.env.NODE_ENV === "development";

module.exports = withPWA(
  withContentlayer({
    pwa: {
      dest: "public",
      disable: isDev,
    },
  })
);
