import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { z, ZodType } from "zod"

const formSchema: ZodType<RoleRequest> = z.object({
    name: z.string().min(3),
    permission_ids: z.set(z.number())
})
type Props = {
    role?: RoleDetailResponse,
    permissionGroups: PermissionGroupResponse[],
    onSubmit: (value: RoleRequest) => void
}
const RoleForm = ({ role, onSubmit, permissionGroups }: Props) => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: role?.name ?? '',
            permission_ids: new Set(role?.permission_ids ?? [])
        }
    })
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                <FormField control={form.control} name='name' render={({ field }) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input type='text' placeholder="Role name" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <ScrollArea className="h-[200px] md:h-[300px] lg:h-[400px] rounded-md border">
                    <FormField
                        control={form.control}
                        name="permission_ids"
                        render={() => (
                            <FormItem>
                                <div className="mb-4">
                                    <FormLabel className="text-base">Permission</FormLabel>
                                    <FormDescription>
                                        Select the permission you want to grant permission in the role.
                                    </FormDescription>
                                </div>
                                {permissionGroups.map((group) => (
                                    <div key={group.name}>
                                        <div className="text-xl">{group.name}</div>
                                        <div className="grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3">
                                            {
                                                group.permissions.map(permission => (
                                                    <FormField
                                                        key={permission.id}
                                                        control={form.control}
                                                        name="permission_ids"
                                                        render={({ field }) => (
                                                            <FormItem
                                                                key={permission.id}
                                                                className="flex flex-row items-start space-x-3 space-y-0"
                                                            >
                                                                <FormControl>
                                                                    <Checkbox
                                                                        checked={field.value?.has(permission.id) ?? false}
                                                                        onCheckedChange={(checked) => {
                                                                            if (checked) {
                                                                                field.onChange(field.value.add(permission.id))
                                                                            } else {
                                                                                field.value.delete(permission.id)
                                                                                field.onChange(field.value);
                                                                            }
                                                                        }}
                                                                    />
                                                                </FormControl>
                                                                <FormLabel className="text-sm font-normal">
                                                                    {permission.name}
                                                                </FormLabel>
                                                            </FormItem>
                                                        )
                                                        }
                                                    />))
                                            }
                                        </div>
                                    </div>
                                ))}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </ScrollArea>
                {form.formState.isSubmitting ? <Button disabled>
                    <Loader2 className="animate-spin" />
                    Please wait
                </Button> :
                    <Button type='submit'>Submit</Button>}
            </form>
        </Form>
    )
}

export default RoleForm