'use client'
import AuthModal from '@/components/modal/AuthModal'
import SubscribeModal from '@/components/modal/SubscribeModal'
import UploadModal from '@/components/modal/UploadModal'
import { ProductWithPrice } from '@/types'

import React, { useEffect, useState } from 'react'

interface ModalProviderProps {
  products: ProductWithPrice[]
}
//modals can cause hydration errors
//so they should only be loaded after the window object is available
export default function ModalProvider({ products }:ModalProviderProps) {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if(!isMounted) return null

  return (
    <>
      <AuthModal/>
      <UploadModal/>
      <SubscribeModal products={products}/>
    </>
  )
}
