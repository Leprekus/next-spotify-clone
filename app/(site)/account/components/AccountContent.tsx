'use client'
import Button from '@/components/ui/Button'
import useSubscribeModal from '@/hooks/useSubscribeModal'
import { useUser } from '@/hooks/useUser'
import { postData } from '@/lib/helpers'
import { useRouter } from 'next/navigation'
import React, { ReactNode, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const Container = ({ children }: { children: ReactNode }) => (
    <div className='mb-7 px-6'>
        <div className='flex flex-col gap-y-4'>
            { children }
        </div>
    </div>
    )

export default function AccountContent() {
    const router = useRouter()
    const subscribeModal = useSubscribeModal()
    const { isLoading, subscription, user } = useUser()

    const [loading, setLoading] = useState(false)

    useEffect(() => {

      if(!isLoading && !user) router.replace('/')

    }, [isLoading, user, router])
    
    const redirectToCustomerPortal = async () => {
        setLoading(true)
        try{
            const { url, error } = await postData({
                url: '/api/create-portal-link'
            })
            window.location.assign(url)
        } catch(error) {

            toast.error((error as Error)?.message)

        } finally {
            setLoading(false)
        }
    }
    
    if(!subscription) return (
        <Container>
            <p>No active plan.</p>
            <Button
                onClick={subscribeModal.Open}
                className='w-[300px]'
            >
                Subscribe
            </Button>
        </Container>
    )
  return (
    <Container>
        <p>You are currently on the <b>{subscription?.prices?.products?.name}</b> plan.</p>
        <p>{user?.email}</p>
        <Button 
            className='w-[300px]'
            disabled={loading || isLoading}
            onClick={redirectToCustomerPortal}
        >
            Open customer portal
        </Button>
    </Container>
  )
}
