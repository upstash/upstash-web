import Head from 'next/head'

import Layout from '../components/layout'

function ErrorPage() {
  return (
    <Layout>
      <Head>
        <title>404</title>
      </Head>

      <h1>404</h1>
    </Layout>
  )
}

export default ErrorPage
