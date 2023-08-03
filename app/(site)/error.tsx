'use client'

import Box from '@/components/ui/Box'
import Button from '@/components/ui/Button'
import React from 'react'

export default function Error() {

  return (
    <Box className='h-full flex flex-col gap-4 items-center justify-center'>
        <div className='text-neutral-400'>
            Something went wrong
        </div>
        <Button 
        onClick={() => window.location.href = '/'}
        className='w-24'>Refresh</Button>
    </Box>
  )
}
