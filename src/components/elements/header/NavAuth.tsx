"use client"
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useAppSelector } from '@/redux/hooks'
import Link from 'next/link'


const NavAuth = () => {
  const auth = useAppSelector(state => state.auth)
  if (auth.authenticated) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Avatar className='cursor-pointer'>
            <AvatarFallback>
              {auth.account?.username[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className='flex flex-col gap-y-2'>
          <Link href={"/profile/" + auth.account?.info.id}>Profile</Link>
          <Link href={"/logout"}>Logout</Link>
        </PopoverContent>
      </Popover>
    )
  }
  return (
    <>
      <Link href={"/login"}>Login</Link>
      <Link href={"/register"}>Register</Link>
    </>
  )
}
export default NavAuth;