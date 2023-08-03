import Box from '@/components/ui/Box'
import React from 'react'
import { MoonLoader } from 'react-spinners'
export default function loading() {
  return (
    <Box className='h-full flex items-center justify-center'>
        <MoonLoader color='#22c55e' size={40}/>
    </Box>
  )
}
