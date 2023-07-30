'use client'
import Modal from '@/components/Modal'

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
      <Modal 
      title='test modal' 
      description='test desc'
      isOpen
      onChange={() => {}}
      >
        Chidlren
      </Modal>
    </>
  )
}
