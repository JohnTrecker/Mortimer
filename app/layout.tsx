

import type { Metadata } from "next";
import localFont from "next/font/local";
import { Providers } from "./providers";
// import { Auth } from '@supabase/auth-ui-react'
// import { ThemeSupa } from '@supabase/auth-ui-shared'

import "./globals.css";
import '@/styles/globals.css'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Mortimer",
  description: "An Index of Ideas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en" /* className="dark" */ 
    >
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
            {children}
        </Providers>
      </body>
    </html>
  );
}


// function MyApp({ Component, pageProps }) {


//   if (!supabase) return null
//   // if (!session) {
//   //   return (
//   //     <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
//   //   )
//   // }
//   return <Component session={session} supabase={supabase} {...pageProps} />
// }

