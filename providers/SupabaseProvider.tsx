'use client'
import React, { type ReactNode } from 'react'
import { type Database } from '@/types_db'

interface SupabaseProviderProps {
    children : ReactNode
}
export default function SupabaseProvider({ children }: SupabaseProviderProps) {
  return (
    <div>SupabaseProvider</div>
  )
}
