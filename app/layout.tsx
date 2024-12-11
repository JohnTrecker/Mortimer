

import type { Metadata } from "next";
import { Providers } from "./providers";
// import { Auth } from '@supabase/auth-ui-react'
// import { ThemeSupa } from '@supabase/auth-ui-shared'

import '@/styles/globals.css'

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
      <body className={`antialiased dark text-foreground bg-background container mx-auto flex flex-col items-center justify-start min-h-screen m-4`}>
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

