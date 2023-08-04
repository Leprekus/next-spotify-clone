'use client'
import React, { useEffect } from 'react'
import Modal from './Modal'
import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation';
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared';
import useAuthModal from '@/hooks/useAuthModal';
import { BsFillClipboardFill } from 'react-icons/bs';
import toast from 'react-hot-toast';

export default function AuthModal() {
    const supabaseClient = useSupabaseClient();
    const router = useRouter()
    const { session } = useSessionContext()
    const { Close: onClose, isOpen } = useAuthModal()

    useEffect(() => {
        if(session) {
            router.refresh()
            onClose()
        }

    }, [session, router, onClose])
    const handleChange = (open: boolean) => {
        if(!open)
            onClose()
    }

  return (
    <Modal
        title='Welcome Back'
        description='Login to account'
        isOpen={isOpen}
        onChange={ handleChange }

    >
        <div className='flex flex-col gap-4 items-center'>
            <p>Admin Credentials</p>
            <div className='flex justify-center gap-4'>
                <button 
                className='
                px-4 
                py-2 
                rounded-md 
                bg-[#2e2e2e] 
                border 
                border-zinc-600
                flex gap-4'
                onClick={() => { 
                    navigator.clipboard.writeText('leprekus@yahoo.com'), toast.success('Copied') 
                }}
                >
                    <BsFillClipboardFill/> <p>Username</p>
                </button>
                <button 
                className='
                px-4 
                py-2 
                rounded-md 
                bg-[#2e2e2e] 
                border 
                border-zinc-600
                flex gap-4'
                onClick={() => { 
                    navigator.clipboard.writeText('qwerty'), toast.success('Copied') 
                }}
                >
                    <BsFillClipboardFill/> <p>Password</p>
                </button>
            </div>
        </div>
        <Auth
        theme='dark'
        magicLink
        supabaseClient={supabaseClient}
        providers={['github']}
        appearance={{
            theme: ThemeSupa,
            variables: {
                default: {
                    colors: {
                        brand: '#404040',
                        brandAccent: '#22c55e'
                    }
                }
            }
        }}
        />
    </Modal>
  )
}
