import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient(cookieStore = cookies()) {
    const resolvedCookies = await cookieStore
    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_API_KEY!,
        {
            cookies: {
                get(name: string) {
                    return resolvedCookies.get(name)?.value
                },
                set(name: string, value: string, options: CookieOptions) {
                    try {
                        resolvedCookies.set({ name, value, ...options })
                    } catch (error) {
                        console.error('Error setting cookies in server: ', error)
                        // The `set` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
                remove(name: string, options: CookieOptions) {
                    try {
                        resolvedCookies.set({ name, value: '', ...options })
                    } catch (error) {
                        console.error('Error removing cookies in server: ', error)
                        // The `delete` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
            },
            auth: {
                persistSession: true
            }
        }
    )
}