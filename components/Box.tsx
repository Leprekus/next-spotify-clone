import React, { type ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
export default function Box({ children, className }: { children : ReactNode, className?: string }) {
  return (
    <div className={twMerge(`
    bg-neutral-900
    rounded-lg
    h-fit
    w-full`, 
    className)}>{ children }</div>
  )
}
