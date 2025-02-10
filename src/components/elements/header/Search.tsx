"use client"
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';

const SearchElement = () => {
    const [keyword, setKeyword] = useState("")
    const router = useRouter()
    const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        router.push("/search?keyword=" + keyword)
    }
    const onKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value)
    }
    return (
        <form onSubmit={onSearch} className='flex w-full max-w-sm items-center space-x-2'>
            <Input onChange={onKeywordChange} className='md:w-24 lg:w-full w-full' placeholder='keyword' /><Button type='submit'><Search /></Button>
        </form>
    )
}

export default SearchElement