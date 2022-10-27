import Head from 'next/head'
import styles from '../styles/Home.module.css'
import CTA from '../components/CTA'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Mortimer</title>
        <meta name="description" content="Fundamental ideas of human interest" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <CTA/>
      </main>

      <footer className={styles.footer}>
        <a
          href="github.com/johntrecker/mortimer"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contribute to this project on Github
        </a>
      </footer>
    </div>
  )
}
