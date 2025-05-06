import { useSearchParams } from 'next/navigation'

export const useQueryParam = (key: string): string | null => {
  const searchParams = useSearchParams()
  return searchParams.get(key)
}
