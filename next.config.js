const withPlugins = require('next-compose-plugins')
const withPWA = require('next-pwa')

const isDev = process.env.NODE_ENV !== 'production'

const nextConfig = {
  env: {
    BASE_URL: isDev
      ? 'http://localhost:3000/'
      : 'https://upstash-landing-page.vercel.app/'
  },
  pwa: {
    dest: 'public',
    disable: isDev
  }
}

module.exports = withPlugins([], withPWA(nextConfig))
