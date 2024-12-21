import React, { createContext, useEffect, useState } from 'react';
import { Session, SupabaseClient } from '@supabase/supabase-js';
import { createClient } from '@/utils/supabase/client';

interface SupabaseState {
    supabase: SupabaseClient | null,
    session: Session | null,
}
const init: SupabaseState = { supabase: null, session: null }
const SupabaseContext = createContext(init)

function SupabaseProvider({ children }: { children: React.ReactNode }) {
    const supabase = createClient()
    const [session, setSession] = useState<Session | null>(null)

    useEffect(() => {
        supabase.auth.getSession()
            .then(({ data: { session } }) => {
                setSession(session)
            })
            .catch(() => setSession(null))

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        return () => subscription.unsubscribe()
    }, [])

    return (
        <SupabaseContext.Provider value={{supabase, session}}>
            {children}
        </SupabaseContext.Provider>
    )
}

export {
    SupabaseProvider,
    SupabaseContext,
}
