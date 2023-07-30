'use client'
import React, { useState, type ReactNode } from 'react'
import { type Database } from '@/types_db'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
interface SupabaseProviderProps {
    children : ReactNode
}
export default function SupabaseProvider({ children }: SupabaseProviderProps) {
    const [ supabaseClient ] = useState(() => 
        createClientComponentClient<Database>()
    )
    return (
    <SessionContextProvider supabaseClient={supabaseClient}>
        { children }
    </SessionContextProvider>
  )
}
