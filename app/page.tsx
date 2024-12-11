'use client'

import Head from 'next/head'
import CTA from '@/components/CTA'

export default function Home() {
  return (
    <div className="min-h-screen p-2 flex flex-col justify-center items-center">
      <Head>
        <title>Mortimer</title>
        <meta name="description" content="Fundamental ideas of human interest" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="py-20 flex-1 flex flex-col justify-center items-center">
        <CTA />
      </main>

      <footer className="w-full h-[100px] border-t border-[#eaeaea] flex justify-center items-center">
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
