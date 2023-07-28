'use client'
import React, { useMemo, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { HiHome } from 'react-icons/hi'
import { BiSearch } from 'react-icons/bi'
import Box from './Box'
import SidebarItem from './SidebarItem'
export default function Sidebar({ children }: { children : ReactNode }) {

    const pathname = usePathname()
    const routes = useMemo(() => [
        {
            icon: HiHome,
            label: 'Home',
            active: pathname === '/',
            href: '/'
        },
        {
            icon: BiSearch,
            label: 'Search',
            active: pathname === '/search',
            href: '/search'
        },
    ], [])

  return (
    <div className=' flex h-full'>
        <div className='
        hidden
        md:flex
        flex-col
        gap-y-2
        bg-black
        h-full
        w-[300px]
        p-2
        '>
        <Box>
            <nav className='flex flex-col gap-y-4 px-4 py-5'>
                {routes.map(item => (
                    <SidebarItem 
                    icon={item.icon}
                    label={item.label}
                    active={item.active}
                    href={item.href}
                    key={item.label}  />
                ))}
            </nav>
        </Box>
        <Box className='overflow-y-auto h-full'>Song Library</Box>
    
        </div>
    </div>
  )
}
