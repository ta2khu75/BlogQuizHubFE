import { DatePicker } from "@/components/common/DatePicker"
import { accountRequestSchema } from "@/components/form/schema/account.request.schema"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"

type Props = {
  onSubmit: (value: AccountRequest) => void
}
const AccountForm = ({ onSubmit }: Props) => {
  const form = useForm<AccountRequest>({
    resolver: zodResolver(accountRequestSchema),
    defaultValues: { email: "", password: '', confirm_password: '', profile: { first_name: '', last_name: '', birthday: new Date() } }
  })
  const onFormSubmit = (e: React.FormEvent) => {
    if (form.formState.isSubmitting) return; // Nếu đang submit thì không gọi handleSubmit nữa
    form.handleSubmit(onSubmit)(e); // Gọi handleSubmit nếu không phải đang submit
  };
  return (
    <Form {...form}>
      <form onSubmit={onFormSubmit} className='space-y-4'>
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
          <FormField control={form.control} name='profile.first_name' render={({ field }) => (
            <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input placeholder="First name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name='profile.last_name' render={({ field }) => (
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
          name="profile.birthday"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <FormControl>
                <DatePicker {...field} />
                {/* <Input type='date' placeholder='Birthday' {...field} /> */}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center">
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