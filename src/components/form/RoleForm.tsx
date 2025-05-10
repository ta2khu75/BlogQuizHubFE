import ButtonSubmit from "@/components/common/ButtonSubmit"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { RoleRequest, roleSchema } from "@/types/request/RoleRequest"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

type Props = {
    role?: RoleResponse,
    permissionGroups: PermissionGroupResponse[],
    onSubmit: (value: RoleRequest) => void
}
const RoleForm = ({ role, onSubmit, permissionGroups }: Props) => {
    const form = useForm({
        resolver: zodResolver(roleSchema),
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
                                                                            const newSet = new Set(field.value);
                                                                            if (checked) {
                                                                                newSet.add(permission.id);
                                                                            } else {
                                                                                newSet.delete(permission.id);
                                                                            }
                                                                            field.onChange(newSet);
                                                                            // if (checked) {
                                                                            //     field.onChange(field.value.add(permission.id))
                                                                            // } else {
                                                                            //     field.value.delete(permission.id)
                                                                            //     field.onChange(field.value);
                                                                            // }
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
                <ButtonSubmit isSubmitting={form.formState.isSubmitting} />
            </form>
        </Form>
    )
}

export default RoleForm