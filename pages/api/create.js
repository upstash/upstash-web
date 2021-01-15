export default async function create(req, res) {
  try {
    await new Promise((r) => setTimeout(r, 1000))
    res.status(200).json({
      endpoint: 'eu1-accepted-krill-30652.upstash.io',
      password: '95eea1e4d4964ef68b8ad6e669c07fb7',
      region: 'eu-west-1',
      port: '30652'
    })
  } catch (error) {
    console.error(error)
    res.status(error.status || 500).end(error.message)
  }
}
