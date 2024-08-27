import '/styles/globals.css'
import useSupabase from '../hooks/useSupabase'

function MyApp({ Component, pageProps }) {
  const {session, supabase} = useSupabase()
  return <Component session={session} supabase={supabase} {...pageProps} />
}

export default MyApp
