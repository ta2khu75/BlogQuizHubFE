"use client"
import AvatarElement from '@/components/common/AvatarElement'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useLogoutMutation } from '@/redux/api/authApi'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { AuthActions } from '@/redux/slice/authSlice'
import { handleMutation } from '@/util/mutation'
import Link from 'next/link'


const NavAuth = () => {
  const auth = useAppSelector(state => state.auth)
  const [logout, { isLoading }] = useLogoutMutation()
  const dispatch = useAppDispatch()
  const onLogout = async () => {
    if (isLoading)
      await handleMutation(() => logout().unwrap(), () => {
        dispatch(AuthActions.reset())
      }, undefined, { success: "Logout successful", error: "Logout failed" })
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