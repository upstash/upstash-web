const withPWA = require('next-pwa')
const isDev = process.env.NODE_ENV === 'development'

module.exports = withPWA({
  env: {
    BASE_URL: isDev
      ? 'http://localhost:3000/'
      : 'https://upstash.com/'
  },
  pwa: {
    dest: 'public',
    disable: isDev
  }
})
