'use client'
import useDebounce from '@/hooks/useDebounce'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import qs from 'query-string'
import Input from './Input'

interface SearchInputProps {}
export default function SearchInput({}:SearchInputProps) {
    const router = useRouter()
    const [value, setValue] = useState('')
    const debouncedValue = useDebounce<string>(value, 500)

    useEffect(() => {
        const query = {
            title: debouncedValue
        }
        const url = qs.stringifyUrl({
            url: '/search',
            query,
        })

        router.push(url)
    }, [debouncedValue, router])

  return (
    <div>
        <Input
            placeholder='What are we listening today?'
            value={value}
            onChange={(event) => setValue(event.target.value)}
        />
    </div>
  )
}
