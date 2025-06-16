"use client"
import AvatarElement from '@/components/common/AvatarElement'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useToast } from '@/hooks/use-toast'
import { useLoginMutation, useLogoutMutation } from '@/redux/api/authApi'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { AuthActions } from '@/redux/slice/authSlice'
import Link from 'next/link'


const NavAuth = () => {
  const auth = useAppSelector(state => state.auth)
  const [logout] = useLogoutMutation()
  const { toast } = useToast()
  const dispatch = useAppDispatch()
  const onLogout = async () => {
    try {
      await logout().unwrap()
      dispatch(AuthActions.reset())
      toast({ variant: 'success', title: "Logout successful" })
    } catch (error) {
      const err = error as ApiResponse<object>;
      toast({ variant: 'destructive', title: 'Logout failed', description: err.message })
    }
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className='cursor-pointer'>
          <AvatarElement profile={auth.profile} />
        </div>
      </PopoverTrigger>
      <PopoverContent className='flex flex-col gap-y-2 w-36'>
        <NavigationMenu>
          <NavigationMenuList className='flex flex-col'>
            <NavigationMenuItem>
              <Link href={`/profile?id=${auth.profile?.id}`} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Profile
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink onClick={onLogout} className={navigationMenuTriggerStyle()}>
                Logout
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </PopoverContent>
    </Popover>
  )
}
export default NavAuth;