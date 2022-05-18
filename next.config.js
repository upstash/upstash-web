const { withContentlayer } = require("next-contentlayer");
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;

  return withContentlayer({
    swcMinify: true,
    env: {
      NEXT_PUBLIC_URL: isDev ? "http://localhost:3000" : `https://upstash.com`,
    },
    compiler: {
      removeConsole:
        process.env.NODE_ENV === "development"
          ? false
          : {
              exclude: ["error"],
            },
    },
  });
};
