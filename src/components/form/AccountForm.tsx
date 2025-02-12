import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { z, ZodType } from "zod"

const formSchema: ZodType<AccountRequest> = z.object({
  email: z.string().email(),
  password: z.string().min(3),
  confirm_password: z.string().min(3),
  first_name: z.string().min(3),
  last_name: z.string().min(3),
  birthday: z.string()
}).refine(data => data.password === data.confirm_password, {
  message: 'confirm password not match',
  path: ['confirm_password']
})
type Props = {
  onSubmit: (value: AccountRequest) => void
}
const AccountForm = ({ onSubmit }: Props) => {
  const form = useForm<AccountRequest>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: '', confirm_password: '', first_name: '', last_name: '', birthday: new Date().toISOString().split('T')[0] }
  })
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField control={form.control} name='email' render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type='email' placeholder="Email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <div className='grid grid-cols-2 gap-4'>
          <FormField control={form.control} name='password' render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name='confirm_password' render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Confirm password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name='first_name' render={({ field }) => (
            <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input placeholder="First name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name='last_name' render={({ field }) => (
            <FormItem>
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input placeholder="Last name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>
        <FormField
          control={form.control}
          name="birthday"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <FormControl>
                <Input type='date' placeholder='Birthday' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          {form.formState.isSubmitting ? <Button disabled>
            <Loader2 className="animate-spin" />
            Please wait
          </Button> :
            <Button type='submit'>Submit</Button>}
        </div>
      </form>
    </Form>
  )
}

export default AccountForm