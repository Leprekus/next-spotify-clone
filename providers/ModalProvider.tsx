'use client'
import AuthModal from '@/components/AuthModal'
import UploadModal from '@/components/UploadModal'

import React, { useEffect, useState } from 'react'

//modals can cause hydration errors
//so they should only be loaded after the window object is available
export default function ModalProvider() {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if(!isMounted) return null

  return (
    <>
      <AuthModal/>
      <UploadModal/>
    </>
  )
}