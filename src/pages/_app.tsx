import '../../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return <>
  <Head>
    <title>Quizlics | Your lyrics quiz</title>
    <link rel="shortcut icon" href="/quizlics_logo_transparent_blue.png" type="image/x-icon" />
  </Head>
  <Component {...pageProps} />
  </>
}

export default MyApp
