const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER

  return {
    env: {
      BASE_URL: isDev
        ? 'http://localhost:3000/'
        : 'https://upstash-landing-page.vercel.app/'
    }
    // webpack: (config, { dev, isServer }) => {
    //   // Replace React with Preact only in client production build
    //   if (!dev && !isServer) {
    //     Object.assign(config.resolve.alias, {
    //       react: 'preact/compat',
    //       'react-dom/test-utils': 'preact/test-utils',
    //       'react-dom': 'preact/compat'
    //     })
    //   }
    //
    //   return config
    // }
  }
}
