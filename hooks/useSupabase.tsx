import { createClient } from '@supabase/supabase-js'

const useSupabase = () => {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_API_KEY,
    )
    return supabase
}

export default useSupabase