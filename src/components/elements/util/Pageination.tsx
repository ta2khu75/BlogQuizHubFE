import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { usePathname, useSearchParams } from 'next/navigation'
import React from 'react'
type Props<T> = {
    page: PageResponse<T>
}
const Pageination = <T,>({ page }: Props<T>) => {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const currentPage = Number(searchParams.get('page')) || 1;
    const middlePage = Math.ceil(page.total_pages / 2);
    const calculatorRenderPage = () => {
        if (page.total_pages <= 1) return undefined
        if (currentPage <= middlePage) {
            return (
                <>
                    <PaginationItem>
                        <PaginationLink href={`${pathname}`}>{currentPage}</PaginationLink>
                    </PaginationItem>
                    {
                        page.total_pages > 1 &&
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                    }
                </>
            )
        } return (
            <>
                {
                    page.total_pages > 1 &&
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                }
                <PaginationItem>
                    <PaginationLink href={`${pathname}`}>1</PaginationLink>
                </PaginationItem>
            </>

        )
    }
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href={`${pathname}?page=${currentPage - 1}`} />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href={`${pathname}`}>1</PaginationLink>
                </PaginationItem>
                {/* <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem> */}
                {calculatorRenderPage()}
                {page.total_pages > 1 &&
                    < PaginationItem >
                        <PaginationLink href={`${pathname}?page=${page?.total_pages}`}>{page?.total_pages}</PaginationLink>
                    </PaginationItem>
                }
                <PaginationItem>
                    <PaginationNext href={`${pathname}?page=${currentPage + 1}`} />
                </PaginationItem>
            </PaginationContent>
        </Pagination >
    )
}

export default Pageination