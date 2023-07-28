'use client'
import React, { useMemo, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
function Sidebar({ children }: { children : ReactNode }) {

    const pathname = usePathname()
    const routes = useMemo(() => [
        {
            label: 'Home',
            active: pathname !== '/search',
            href: '/'
        },
        {
            label: 'Search',
            active: pathname !== '/search',
            href: '/search'
        },
    ], [])

  return (
    <div>{ children }</div>
  )
}

export default Sidebar