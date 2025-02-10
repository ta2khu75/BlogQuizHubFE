"use client"
import { useSearchParams } from 'next/navigation';

const SearchPage = () => {
    const searchParams = useSearchParams()

    const keyword = searchParams.get('keyword')
    return (
        <div>{keyword}</div>
    )
}

export default SearchPage