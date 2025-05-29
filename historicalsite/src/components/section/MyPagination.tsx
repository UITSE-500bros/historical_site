// MyPagination.tsx
"use client"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination"
import { useRouter } from "next/navigation"

type Props = {
  currentPage: number
  setCurrentPage: (page: number) => void
  totalPages: number
  url?: string
}

export function MyPagination({ currentPage, setCurrentPage, totalPages,url }: Props) {
  const router = useRouter()
  const visiblePages = () => {
  const delta = 2; // số trang trái/phải currentPage
  const start = Math.max(currentPage - delta, 1);
  const end = Math.min(currentPage + delta, totalPages);
  const pages = [];

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
};
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" onClick={(e)=>{
            e.preventDefault()
            setCurrentPage(Math.max(currentPage - 1, 1))
            router.push(`${url}?page=${Math.max(currentPage - 1, 1)}`)
          }} />
        </PaginationItem>

        {visiblePages().map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href="#"
              isActive={page === currentPage}
              onClick={(e) => {
                e.preventDefault()
                setCurrentPage(page)
                router.push(`${url}?page=${page}`)
              }}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext href="#" onClick={(e) => {
            e.preventDefault()
            setCurrentPage(Math.min(currentPage + 1, totalPages))
            router.push(`${url}?page=${Math.min(currentPage + 1, totalPages)}`)
          }} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
