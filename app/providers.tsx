'use client'

import { SelectionProvider } from '@/context/selection';
import { SupabaseProvider } from '@/context/supabase'
import { NextUIProvider } from '@nextui-org/react'
import { useRouter } from "next/navigation";

declare module "@react-types/shared" {
    interface RouterConfig {
        routerOptions: NonNullable<Parameters<ReturnType<typeof useRouter>["push"]>[1]>;
    }
}

export function Providers({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const useHref = (href: string) => process.env.BASE_PATH + href;

    return (
        <NextUIProvider navigate={router.push} useHref={useHref}>
            <SupabaseProvider>
                <SelectionProvider>
                    {children}
                </SelectionProvider>
            </SupabaseProvider>
        </NextUIProvider>
    )
}