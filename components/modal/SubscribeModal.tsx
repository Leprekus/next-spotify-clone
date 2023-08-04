'use client'
import React, { useState } from 'react'
import Modal from './Modal'
import { Price, ProductWithPrice } from '@/types'
import Button from '../ui/Button'
import { useUser } from '@/hooks/useUser'
import toast from 'react-hot-toast'
import { postData } from '@/lib/helpers'
import { getStripe } from '@/lib/stripeClient'
import useSubscribeModal from '@/hooks/useSubscribeModal'

interface SubscribeModalProps {
  products: ProductWithPrice[]
}

export default function SubscribeModal({ products }: SubscribeModalProps) {

  const [priceIdLoading, setPriceIdLoading] = useState<string | null>()
  const { user, isLoading,  subscription } = useUser()
  const subscribeModal = useSubscribeModal()
  const handleChange = (open:boolean) => {
    if(!open) subscribeModal.Close()
  }

  const handleCheckout = async(price: Price) => {
    setPriceIdLoading(price.id)
    if(!user) {
      setPriceIdLoading(null)
      return toast.error('Must be logged in')
    }
    if(subscription) {
      setPriceIdLoading(null)
      return toast('Already subscribed')
    }
    
    try {
      
      const { sessionId } = await postData({
        url: '/api/create-checkout-session',
        data: { price }
      })

      const stripe = await getStripe()
      stripe?.redirectToCheckout({ sessionId })

    } catch(error) {
      toast.error((error as Error)?.message ?? 'Something went wrong')
    } finally {
      setPriceIdLoading(null)
     }
  }

  let content = (
    <div className='text-center'>No products available.</div>
  )

  const formatPrice = (price:Price) => {
    const priceString = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: price.currency,
      minimumFractionDigits: 0,
    }).format((price?.unit_amount || 0) / 100)

    return priceString
  }

  if(products.length) 
    content = (
    <div>
      {
        products.map(product => {
          if(!product.prices?.length) 
            return <div key={product.id}>No prices available</div>
          
          return product.prices.map(price => (
            <Button 
              key={price.id}
              onClick={() => handleCheckout(price)}
              disabled={isLoading || price.id === priceIdLoading}
            >
              {`Subscribe for ${formatPrice(price)} a ${price.interval}`}
            </Button>
          ))

        })
      }
    </div>
  )
  if(subscription) 
      content = (
        <div className='text-center'>
          Already subscribed
        </div>
      )
  return (
    <Modal
     title='Only for premium users'
     description='Listen to music anywhere you go, on the go'
     isOpen={subscribeModal.isOpen}
     onChange={handleChange}
    >
      { content }
    </Modal>
  )
}
