import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { usePathname, useSearchParams } from 'next/navigation'
import React from 'react'
type Props<T> = {
    page: PageResponse<T>
}
const Pageination = <T,>({ page }: Props<T>) => {
    const { total_pages } = page
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const currentPage = Number(searchParams.get('page')) || 1;
    const middlePage = Math.ceil(total_pages / 2);
    const calculatorRenderPage = () => {
        if (total_pages <= 2) return undefined
        if (currentPage <= middlePage) {
            return (
                <>
                    {
                        currentPage - 1 > 1 &&
                        <PaginationItem>
                            <PaginationLink href={`${pathname}?page=${currentPage - 1}`}>{currentPage - 1}</PaginationLink>
                        </PaginationItem>
                    }
                    {
                        currentPage !== 1 &&
                        <PaginationItem>
                            <PaginationLink isActive={true} href={`${pathname}?page=${currentPage}`}>{currentPage}</PaginationLink>
                        </PaginationItem>
                    }
                    {
                        currentPage + 1 !== total_pages &&
                        <PaginationItem>
                            <PaginationLink href={`${pathname}?page=${currentPage + 1}`}>{currentPage + 1}</PaginationLink>
                        </PaginationItem>
                    }
                    {
                        // total_pages > 1 &&
                        currentPage + 2 < total_pages && currentPage + 1 < total_pages &&
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                    }
                </>
            )
        } return (
            <>
                {
                    currentPage - 1 > 1 && currentPage - 2 > 1 &&
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                }
                {currentPage - 1 > 1 &&
                    <PaginationItem>
                        <PaginationLink href={`${pathname}?page=${currentPage - 1}`}>{currentPage - 1}</PaginationLink>
                    </PaginationItem>
                }
                {currentPage !== total_pages &&
                    <PaginationItem>
                        <PaginationLink isActive={true} href={`${pathname}?page=${currentPage}`}>{currentPage}</PaginationLink>
                    </PaginationItem>
                }
                {currentPage + 1 < total_pages &&
                    <PaginationItem>
                        <PaginationLink href={`${pathname}?page=${currentPage + 1}`}>{currentPage + 1}</PaginationLink>
                    </PaginationItem>
                }
            </>

        )
    }
    return (
        <Pagination>
            <PaginationContent>
                {
                    currentPage !== 1 &&
                    <PaginationItem>
                        <PaginationPrevious href={`${pathname}?page=${currentPage - 1}`} />
                    </PaginationItem>
                }
                <PaginationItem>
                    <PaginationLink isActive={currentPage === 1} href={`${pathname}`}>1</PaginationLink>
                </PaginationItem>
                {calculatorRenderPage()}
                {total_pages > 1 &&
                    < PaginationItem >
                        <PaginationLink isActive={currentPage === total_pages} href={`${pathname}?page=${page?.total_pages}`}>{page?.total_pages}</PaginationLink>
                    </PaginationItem>
                }
                {
                    currentPage !== total_pages &&
                    <PaginationItem>
                        <PaginationNext href={`${pathname}?page=${currentPage + 1}`} />
                    </PaginationItem>
                }
            </PaginationContent>
        </Pagination >
    )
}

export default Pageination