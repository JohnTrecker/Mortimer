"use client"

import { createContext, useState } from 'react';
import { createClient, SupabaseClient, Session } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_API_KEY,
)

interface SupabaseProviderProps {
    session: Session | null;
    supabase: SupabaseClient;
}

const initial: SupabaseProviderProps = {
    session: null,
    supabase,
}

const SupabaseContext = createContext(initial);

const SupabaseProvider = ({ children }) => {
    const [session, setSession] = useState<Session | null>(null)
    supabase.auth.getSession()
        .then(({ data, error }) => {
            if (error) throw error
            setSession(data.session)
        })
        .catch(() => setSession(null))

    supabase.auth.onAuthStateChange(async (_event, session) => {
        setSession(session)
    })
    
    return (
        
        <SupabaseContext.Provider value={{session, supabase}}>
            {children}
        </SupabaseContext.Provider>
    )
}

export { SupabaseProvider, SupabaseContext }