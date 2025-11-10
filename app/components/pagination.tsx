import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface PaginationProps {
    currentPage: number,
    totalPages: number,
    baseUrl: string,
    searchParams: Record<string, string>
}

const Pagination = ({ currentPage, totalPages, baseUrl, searchParams }: PaginationProps) => {
    if (totalPages <= 1) return null;
    const getPageUrl = (page: number) => {
        const params = new URLSearchParams(searchParams);
        return `${baseUrl}?${params.toString()}&page=${page < 1 ? 1 : page > totalPages ? totalPages : page}`;
    }

    const getVisiblePages = () => {
        const delta = 2;
        const range = [];
        const rangeWithDots = [];

        for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
            range.push(i)
        }

        if (currentPage - delta > 2) {
            rangeWithDots.push(1, '...') // 1 ... 3
        } else {
            rangeWithDots.push(1) // 1
        }

        rangeWithDots.push(...range)

        if (currentPage + delta < totalPages - 1) {
            rangeWithDots.push('...', totalPages) // ... 1
        } else {
            rangeWithDots.push(totalPages) // 1
        }
        return rangeWithDots
    }
    const visiblePages = getVisiblePages();

    return (
        <nav className="flex items-center justify-center overflow-x-auto p-2">
            <div className="flex justify-normal sm:justify-center items-center gap-2 w-full">
                <Link
                    href={getPageUrl(currentPage - 1)}
                    className={`flex items-center justify-center w-10 h-10 text-sm rounded-full shadow border border-gray-200 ${currentPage <= 1 ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-900'}`}
                    aria-disabled={currentPage <= 1}
                >
                    <ChevronLeft size={18} />
                </Link>
                {visiblePages.map((page, index) => {
                    if (page === '...') return <span key={index} className="text-gray-500">...</span>
                    const pageNumber = page as number;
                    const isCurrentPage = currentPage === pageNumber;
                    return (
                        <Link
                            key={index}
                            href={getPageUrl(pageNumber)}
                            className={`flex items-center justify-center w-10 h-10 text-sm rounded-full shadow ${isCurrentPage ? 'bg-violet-600 text-white' : 'bg-white text-gray-900'}`}
                        >
                            {page}
                        </Link>
                    )
                })}
                <Link
                    href={getPageUrl(currentPage + 1)}
                    className={`flex items-center justify-center w-10 h-10 text-sm rounded-full shadow border border-gray-200 ${currentPage >= totalPages ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-900'}`}
                    aria-disabled={currentPage >= totalPages}
                >
                    <ChevronRight size={18} />
                </Link>
            </div>
        </nav>
    );
}

export default Pagination;