'use client'
import React from 'react'
import Modal from './Modal'
import useUploadModal from '@/hooks/useUploadModal'

export default function UploadModal() {
    const uploadModal = useUploadModal()
    const handleChange = (open:boolean) => {
        if(!open)
            //reeset the form
            uploadModal.Close()
    }
  return (
    <Modal
    title='Upload Modal'
    description='Upload Modal desc'
    isOpen={uploadModal.isOpen}
    onChange={ handleChange }
    >UploadModal</Modal>
  )
}
