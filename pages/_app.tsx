import '@/styles/globals.css'
import { SupabaseProvider } from '@/context/supabase'

function MyApp({ Component, pageProps }) {
  return (
    <SupabaseProvider>
      <Component {...pageProps} />
    </SupabaseProvider>
    )
}

export default MyApp
