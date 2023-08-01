'use client'
import React, { useMemo, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { HiHome } from 'react-icons/hi'
import { BiSearch } from 'react-icons/bi'
import Box from './Box'
import SidebarItem from './SidebarItem'
import Library from './Library'
import { Song } from '@/types'
import { AiFillHeart } from 'react-icons/ai'
export default function Sidebar({ children, songs }: { children : ReactNode, songs: Song[] }) {

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
        {
            icon: AiFillHeart,
            label: 'Liked',
            active: pathname === '/liked',
            href: '/liked'
        },
    ], [pathname])

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
            <Box className='overflow-y-auto h-full'>
                <Library songs={songs}/>
            </Box>
        </div>
        <main className='h-full flex-1 overflow-y-auto py-2'>{ children }</main>
    </div>
  )
}
