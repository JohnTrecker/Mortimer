import Head from 'next/head'
import styles from '../styles/Home.module.css'
import CTA from '../components/CTA'

export default function Home() {
  return (
    <div className="flex container min-h-full h-screen mx-auto px-4 justify-center items-center flex-col" >
      <Head>
        <title>Mortimer</title>
        <meta name="description" content="Fundamental ideas of human interest" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="px-20 flex-1 flex flex-col justify-center items-center" >
        <CTA/>
      </main>

      <footer className="w-full h-24 border-t container">
        <a
          href="github.com/johntrecker/mortimer"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600"
        >
          Contribute to this project on Github
        </a>
      </footer>
    </div>
  )
}
