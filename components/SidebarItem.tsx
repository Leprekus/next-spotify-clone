import Link from 'next/link';
import React from 'react'
import { type IconType } from 'react-icons'
import { twMerge } from 'tailwind-merge';

interface SidebarItemProps {
    icon: IconType;
    label: string;
    active?: boolean;
    href: string;
}
export default function SidebarItem({
    icon: Icon,
    label,
    active,
    href
}: SidebarItemProps) {
  return (
    <Link className={
        twMerge(`
        flex 
        flex-row 
        h-auto 
        items-center
        w-full
        gap-x-4
        text-md
        font-medium
        cursor-pointer
        hover:text-white
        transition
        text-neutral-400
        py-1`, active && 'text-white')} href={href}>
            <Icon/> <p className='tuncate w-100'>{label}</p>
        </Link>
  )
}
