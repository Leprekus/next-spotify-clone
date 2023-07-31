'use client'
import { Song } from '@/types'
import React from 'react'

interface SongItemProps {
    data: Song,
    onClick: (id: string) => void;
}
    export default function SongItem({
        data,
        onClick
}: SongItemProps) {
  return (
    <div>SongItem</div>
  )
}
