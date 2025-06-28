import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { blogHooks } from "@/redux/api/blogApi";
import { blogTagHooks } from "@/redux/api/blogTagApi";
import { BlogSearch } from "@/types/request/search/BlogSearch";
import { BlogResponse } from "@/types/response/BlogResponse";
import { PageResponse } from "@/types/response/PageResponse";
import ParseHelper from "@/util/ParseHelper";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";

const formSchema: ZodType<BlogSearch> = z.object({
  keyword: z.string().optional(),
  tagIds: z.array(z.number().positive()).optional(),
  minView: z.number().min(0).optional(),
  maxView: z.number().min(0).optional(),
});
type Props = {
  setBlogPage: React.Dispatch<
    React.SetStateAction<PageResponse<BlogResponse> | undefined>
  >;
};
const BlogFilter = ({ setBlogPage }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchValues = useMemo(
    () => ({
      keyword: ParseHelper.parseString(searchParams.get("keyword")),
      tag_ids: searchParams.getAll("tagIds").map(Number),
      min_view: ParseHelper.parseNumber(searchParams.get("minView")),
      max_view: ParseHelper.parseNumber(searchParams.get("maxView")),
      page: ParseHelper.parseNumber(searchParams.get("page")) ?? 1,
      author_id: ParseHelper.parseString(searchParams.get("id")),
    }),
    [searchParams]
  );
  const { data: blogTagData } = blogTagHooks.useSearchBlogTagQuery({
    page: 1,
    size: 10,
    direction: "asc",
    sort_by: "createdAt",
  });
  const { data: blogData } = blogHooks.useSearchBlogQuery(searchValues, {
    refetchOnMountOrArgChange: false,
  });
  const blogTagPage = useMemo(() => blogTagData?.data, [blogTagData]);
  const blogPage = useMemo(() => blogData?.data, [blogData]);
  useEffect(() => {
    if (blogPage) setBlogPage(blogPage);
  }, [blogPage, setBlogPage]);
  const createQueryString = useCallback(
    (search: BlogSearch) => {
      console.log(search);
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(search).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          params.delete(key);
          value.forEach((val) => params.append(key, val));
        } else if (value === undefined) {
          params.delete(key);
        } else {
          params.set(key, value as string);
        }
      });
      return params.toString();
    },
    [searchParams]
  );
  const form = useForm<BlogSearch>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keyword: "",
      tagIds: [],
      minView: undefined,
      maxView: undefined,
    },
    shouldUnregister: false,
  });
  useEffect(() => {
    form.reset(searchValues);
  }, [searchValues, form]);
  const onFilter = (data: BlogSearch) => {
    const queryString = createQueryString(data);
    router.push(`${pathname}?${queryString}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filter</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onFilter)}
            className="flex flex-col space-y-4"
          >
            <FormField
              control={form.control}
              name="keyword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Keyword</FormLabel>
                  <FormControl>
                    <Input placeholder="Keyword" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div>
              <Label className="text-base">View range</Label>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="minView"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Min</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Min"
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value
                                ? Number(e.target.value)
                                : undefined
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="maxView"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Max"
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value
                                ? Number(e.target.value)
                                : undefined
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={form.control}
              name="tagIds"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Blog tag</FormLabel>
                  </div>
                  <div className="grid grid-cols-2">
                    {blogTagPage?.content?.map((blogTag) => (
                      <FormField
                        key={blogTag.id}
                        control={form.control}
                        name="tagIds"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={blogTag.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(blogTag.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...(field.value ?? []),
                                          blogTag.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== blogTag.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                {blogTag.name}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Filter
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default BlogFilter;
