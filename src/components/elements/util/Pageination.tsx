import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { usePathname, useSearchParams } from 'next/navigation'
import React, { useMemo } from 'react'
type Props<T> = {
    page: PageResponse<T>
}
const Pageination = <T,>({ page }: Props<T>) => {
    const { total_pages } = page
    const pathName = usePathname()
    const searchParams = useSearchParams()
    const currentPage = useMemo(() => Number(searchParams.get('page')) || 1, [searchParams]);
    const middlePage = useMemo(() => Math.ceil(total_pages / 2), [total_pages]);
    const fullPath = useMemo(() => `${pathName}?${searchParams.toString()}`, [searchParams])
    const getNewQueryString = (page: number) => {
        console.log(fullPath);
        if (fullPath.includes('page')) {
            return fullPath.replace(/page=\d+/, `page=${page}`)
        } else if (fullPath.includes('?')) {
            return `${fullPath}&page=${page}`
        } else {
            return `${fullPath}?page=${page}`
        }
    }
    const calculatorRenderPage = () => {
        if (total_pages <= 2) return undefined
        if (currentPage <= middlePage) {
            return (
                <>
                    {
                        currentPage - 1 > 1 &&
                        <PaginationItem>
                            <PaginationLink href={getNewQueryString(currentPage - 1)}>{currentPage - 1}</PaginationLink>
                        </PaginationItem>
                    }
                    {
                        currentPage !== 1 &&
                        <PaginationItem>
                            <PaginationLink isActive={true} href={getNewQueryString(currentPage)}>{currentPage}</PaginationLink>
                        </PaginationItem>
                    }
                    {
                        currentPage + 1 !== total_pages &&
                        <PaginationItem>
                            <PaginationLink href={getNewQueryString(currentPage + 1)}>{currentPage + 1}</PaginationLink>
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
                        <PaginationLink href={getNewQueryString(currentPage - 1)}>{currentPage - 1}</PaginationLink>
                    </PaginationItem>
                }
                {currentPage !== total_pages &&
                    <PaginationItem>
                        <PaginationLink isActive={true} href={getNewQueryString(currentPage)}>{currentPage}</PaginationLink>
                    </PaginationItem>
                }
                {currentPage + 1 < total_pages &&
                    <PaginationItem>
                        <PaginationLink href={getNewQueryString(currentPage + 1)}>{currentPage + 1}</PaginationLink>
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
                        <PaginationPrevious href={getNewQueryString(currentPage - 1)} />
                    </PaginationItem>
                }
                <PaginationItem>
                    <PaginationLink isActive={currentPage === 1} href={getNewQueryString(1)}>1</PaginationLink>
                </PaginationItem>
                {calculatorRenderPage()}
                {total_pages > 1 &&
                    < PaginationItem >
                        <PaginationLink isActive={currentPage === total_pages} href={getNewQueryString(total_pages)}>{page?.total_pages}</PaginationLink>
                    </PaginationItem>
                }
                {
                    currentPage !== total_pages &&
                    <PaginationItem>
                        <PaginationNext href={getNewQueryString(currentPage + 1)} />
                    </PaginationItem>
                }
            </PaginationContent>
        </Pagination >
    )
}

export default Pageination