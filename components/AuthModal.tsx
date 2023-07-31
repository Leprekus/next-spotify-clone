'use client'
import React, { useEffect } from 'react'
import Modal from './Modal'
import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation';
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared';
import useAuthModal from '@/hooks/useAuthModal';

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
        onChange={() => handleChange}

    >
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
