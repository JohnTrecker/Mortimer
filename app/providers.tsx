'use client'

import { SupabaseProvider } from '@/context/supabase'
import { NextUIProvider } from '@nextui-org/react'

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <NextUIProvider>
            <SupabaseProvider>
                {children}
            </SupabaseProvider>
        </NextUIProvider>
    )
}