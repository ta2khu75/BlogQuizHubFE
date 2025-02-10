"use client"
import AvatarElement from '@/components/elements/header/AvatarElement'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useToast } from '@/hooks/use-toast'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { AuthActions } from '@/redux/slice/authSlide'
import AuthService from '@/services/AuthService'
import FunctionUtil from '@/util/FunctionUtil'
import Link from 'next/link'


const NavAuth = () => {
  const auth = useAppSelector(state => state.auth)
  const { toast } = useToast()
  const dispatch = useAppDispatch()
  const onLogout = () => {
    AuthService.logout().then(res => {
      if (res.success) {
        dispatch(AuthActions.reset())
      } else {
        dispatch(AuthActions.reset())
        console.log(res.message_error);
      }
    }).catch(err => toast({ variant: "destructive", title: "Logout failed", description: FunctionUtil.showError(err) }))
  }
  if (auth.authenticated) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <div className='cursor-pointer'>
            <AvatarElement account={auth.account} />
          </div>
        </PopoverTrigger>
        <PopoverContent className='flex flex-col gap-y-2 w-36'>
          <NavigationMenu>
            <NavigationMenuList className='flex flex-col'>
              <NavigationMenuItem>
                <Link href={"/profile?id=" + auth.account?.info.id} legacyBehavior passHref>
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
  return (
    <>
      <Link href={"/login"}>Login</Link>
      <Link href={"/register"}>Register</Link>
    </>
  )
}
export default NavAuth;