'use client'
import { useRouter } from 'next/navigation'
import React, { type ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import { RxCaretLeft, RxCaretRight} from 'react-icons/rx'
import { HiHome } from 'react-icons/hi'
import { BiSearch } from 'react-icons/bi'
import useAuthModal from '@/hooks/useAuthModal'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useUser } from '@/hooks/useUser'
import { FaUserAlt } from 'react-icons/fa'
import toast from 'react-hot-toast'
import Button from './ui/Button'
import usePlayer from '@/hooks/usePlayer'
interface HeaderProps {
    children: ReactNode
    className?: string
}
export default function Header({
    children, 
    className
}: HeaderProps) {


    const player = usePlayer()
    const authModal = useAuthModal()
    const router = useRouter()

    const supabaseClient = useSupabaseClient()
    const { user } = useUser()
    const handleLogout = async () => {
        const { error } = await supabaseClient.auth.signOut()
        player.reset()
        router.refresh()

        if(error)
            toast.error(error.message)
        else  
            toast.success('Logged Out')

    }
  return (
    <div
    className={twMerge(`
    h-fit
    bg-gradient-to-b
    from-emerald-800
    p-6
    `, className)}
    >
        <div className='
            w-full
            mb-4
            flex
            items-center
            justify-between

        '>
            <div className='
                hidden
                md:flex
                gap-x-2
                items-center
            '>
                <button 
                onClick={() => router.back()}
                className='
                    rounded-full 
                    bg-black 
                    flex 
                    items-center
                    justify-center
                    hover:opacity-75
                    transition'>
        
                    <RxCaretLeft size={35} className='text-white'/>
                </button>
                <button 
                onClick={() => router.forward()}
                className='
                    rounded-full 
                    bg-black 
                    flex 
                    items-center
                    justify-center
                    hover:opacity-75
                    transition'>
        
                    <RxCaretRight size={35} className='text-white'/>
                </button>
            </div>
            <div 
            className='
                flex
                md:hidden gap-x-2 items-center'>
                    <button className='
                        rounded-full
                        p-2
                        bg-white
                        flex
                        items-center
                        opacity-75
                        hover:opacity-100
                        transition
                    '>
                        <HiHome className='text-black'size={23}/>
                    </button>
                    <button className='
                        rounded-full
                        p-2
                        bg-white
                        flex
                        items-center
                        opacity-75
                        hover:opacity-100
                        transition
                    '>
                        <BiSearch className='text-black'size={23}/>
                    </button>
            </div>
            <div className='
                flex
                justify-between
                items-center
                gap-x-4
            '>
                {user ? (
                    <div className='flex gap-x-4 items-center'> 
                        <Button
                            onClick={handleLogout}
                            className='bg-white px-4 py-1'
                        >Logout
                        </Button>
                        <Button
                            onClick={() => router.push('/account')}
                            className='bg-white p-2 rounded-md'
                        ><FaUserAlt/>
                        </Button>
                    </div>
                ) : (
                    <>
                        <div>
                            <Button 
                            onClick={authModal.Open}
                            className='
                                bg-transparent
                                text-neutral-300
                                font-medium'
                            >Log In</Button>
                        </div>
                        <div>
                            <Button 
                            onClick={authModal.Open}
                            className='
                                bg-white
                                px-6
                                py-2'
                            >Sign Up</Button>
                        </div>
                    </>
                )}
            </div>
        </div>
        { children }
    </div>
    
  )
}
