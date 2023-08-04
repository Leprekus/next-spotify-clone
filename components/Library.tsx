'use client'
import React from 'react'
import { TbPlaylist } from 'react-icons/tb'
import { AiOutlinePlus } from 'react-icons/ai'
import useAuthModal from '@/hooks/useAuthModal'
import { useUser } from '@/hooks/useUser'
import useUploadModal from '@/hooks/useUploadModal'
import { Song } from '@/types'
import MediaItem from './MediaItem'
import useOnPlay from '@/hooks/useOnPlay'
import useSubscribeModal from '@/hooks/useSubscribeModal'
export default function Library({ songs }:{ songs:Song[] }) {


    const authModal = useAuthModal()
    const uploadModal = useUploadModal()
    const subscribeModal = useSubscribeModal()
    const { user, subscription } = useUser()

    const onPlay = useOnPlay(songs)

    const handleClick = () => {
        if(!user)
            return authModal.Open()
        
        if(!subscription) 
            return subscribeModal.Open()
            
        return uploadModal.Open()
    }

  return (
    <div className='flex flex-col'>
        <div
        className='
        flex
        items-center
        justify-between
        px-5
        pt-4'
        >
            <div className='
                inline-flex
                items-center
                gap-x-2'>
                <TbPlaylist className='text-neutral-400'/>
                <p className='
                text-neutral-400 
                font-medium 
                text-md'>
                    Your Library
                </p>
            </div>
            <AiOutlinePlus onClick={ handleClick } 
            size={20}
            className='
                text-neutral-400
                cursor-pointer
                hover:text-white
                transition
            '/>
        </div>
        <div className='
        flex
        flex-col
        gap-y-2
        mt-4
        px-3'>{
            songs.map((song) => 
            <MediaItem 
            key={song.id}
            data={song}
            onClick={(id: string) => onPlay(id)}
            />)
        }</div>
    </div>
  )
}
